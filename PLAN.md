# Flexflix — Implementation Plan

## Context

Build a client-side TV show & movie watchlist manager. Users log in with their TMDB account, search/browse content, track what they've watched (per-episode for TV), save things for later, and view watch stats. All user state lives in localStorage via Zustand. Activity log baked in from day one to support future gamification (badges/achievements on the Profile page).

**Stack:** React (Vite) + shadcn/ui + TanStack Router + TanStack Query + Zustand + TMDB API v3 + localStorage + Steiger (FSD linter)

---

## Pages & Routing

TanStack Router with `_authenticated` layout route for protection.

```
src/app/routes/
  __root.tsx                      # Root layout (Outlet only)
  login.tsx                       # /login (public)
  _authenticated.tsx              # Auth guard layout (AppShell + Outlet)
  _authenticated/
    index.tsx                     # / → DiscoverPage
    watchlist.tsx                 # /watchlist → WatchlistPage
    profile.tsx                   # /profile → ProfilePage
    movie.$id.tsx                 # /movie/$id → MovieDetailPage
    tv.$id.tsx                    # /tv/$id → ShowDetailPage
```

`_authenticated.tsx` uses `beforeLoad` to check `useSessionStore.getState().isAuthenticated()` and redirects to `/login` if false.

---

## TMDB Auth Flow

1. `GET /authentication/token/new` → request_token
2. `POST /authentication/token/validate_with_login` → validate with username + password + request_token
3. `POST /authentication/session/new` → session_id

Session stored in Zustand (`flexflix:session` localStorage key). Users need a TMDB account (username/password, **not** email).

---

## FSD Structure (Feature-Sliced Design)

FSD import rule: layers can only import from layers **below** them.
`app` > `pages` > `widgets` > `features` > `entities` > `shared`

```
src/
  app/
    main.tsx, providers.tsx, styles/globals.css
    routes/                          # See routing section above

  pages/
    login/         ui/LoginPage.tsx, ui/LoginForm.tsx, model/login.ts
    discover/      ui/DiscoverPage.tsx, ui/SearchBar.tsx, ui/SearchResults.tsx,
                   ui/TrendingSection.tsx, ui/PopularSection.tsx, model/discover.ts
    watchlist/     ui/WatchlistPage.tsx, ui/ContinueWatchingSection.tsx,
                   ui/ContinueWatchingCard.tsx, ui/WatchLaterSection.tsx,
                   ui/FullWatchlistSection.tsx, ui/WatchlistEmptyState.tsx,
                   model/watchlist-page.ts
    profile/       ui/ProfilePage.tsx, ui/UserHeader.tsx, ui/StatsOverview.tsx,
                   ui/StatusBreakdown.tsx, ui/RecentActivity.tsx,
                   ui/GenreDistribution.tsx, model/profile-stats.ts
    movie-detail/  ui/MovieDetailPage.tsx
    show-detail/   ui/ShowDetailPage.tsx

  widgets/
    app-shell/         ui/AppShell.tsx, ui/Header.tsx, ui/MobileNav.tsx
    season-tracker/    ui/SeasonTracker.tsx, ui/SeasonAccordion.tsx,
                       ui/EpisodeRow.tsx, ui/SeasonProgressBar.tsx

  features/
    add-to-watchlist/    ui/WatchlistButton.tsx, ui/StatusSelect.tsx, ui/RatingInput.tsx
    add-to-watch-later/  ui/WatchLaterButton.tsx
    toggle-episode/      model/episode-progress.ts
    search-media/        model/search-media.ts
    browse-media/        model/browse-media.ts

  entities/
    media/
      ui/MediaCard.tsx, ui/MediaGrid.tsx, ui/MediaRow.tsx, ui/MediaListItem.tsx,
      ui/MediaCardSkeleton.tsx, ui/PosterImage.tsx
      model/media.ts                  # MediaType, WatchStatus enums
      api/media-queries.ts            # TanStack Query hooks
    watchlist/
      model/watchlist.ts              # WatchlistEntry, TvShowProgress, ActivityEvent types
      model/watchlist-store.ts        # Zustand store (all mutations + activity log)
      model/continue-watching.ts      # Next-episode computation

  shared/
    ui/                               # shadcn components + ErrorBoundary, ApiError
    api/
      tmdb-client.ts                  # Fetch wrapper + rate limiter
      tmdb-media.ts                   # TMDB response types
      tmdb-media-endpoints.ts         # All TMDB endpoint functions
      query-client.ts                 # TanStack Query config
    auth/
      session.ts                      # Zustand session store (flexflix:session)
      tmdb-auth.ts                    # 3-step auth API functions
    lib/
      image.ts                        # posterUrl(), backdropUrl()
    config/
      tmdb.ts                         # Base URLs, image URLs
```

---

## Data Models

### Session Store (`shared/auth/session.ts`)
```typescript
{ sessionId: string | null, accountId: number | null, username: string | null }
```

### Local App Models (stored in localStorage via Zustand)

```typescript
// entities/media/model/media.ts
enum MediaType {
  Movie = "movie",
  TvShow = "tv",
}
enum WatchStatus {
  PlanToWatch,
  Watching,
  Completed,
  Dropped,
  OnHold,
}

// entities/watchlist/model/watchlist.ts
interface WatchlistEntry {
  tmdbId: number
  mediaType: MediaType
  title: string             // denormalized from TMDB
  posterPath: string | null // denormalized from TMDB
  genreIds: number[]        // denormalized at add time for Profile genre stats
  status: WatchStatus
  userRating: number | null // 1-10
  addedAt: string           // ISO 8601
  updatedAt: string
  notes: string
}

interface TvShowProgress {
  tmdbId: number
  watchedEpisodes: Record<number, number[]> // seasonNumber -> watched episodeNumbers[]
  completedSeasons: number[]
  updatedAt: string
}

interface WatchLaterEntry {
  tmdbId: number
  mediaType: MediaType
  title: string
  posterPath: string | null
  addedAt: string
}

interface ActivityEvent {
  id: string
  type: ActivityEventType
  tmdbId: number
  mediaType: MediaType
  timestamp: string         // ISO 8601
  metadata?: Record<string, unknown>
}

type ActivityEventType =
  | "added_to_watchlist"
  | "removed_from_watchlist"
  | "status_changed"
  | "rating_changed"
  | "episode_watched"
  | "episode_unwatched"
  | "season_completed"
  | "added_to_watch_later"
  | "removed_from_watch_later"
  | "promoted_to_watchlist"
```

### Watchlist Store (`entities/watchlist/model/watchlist-store.ts`)

Key: `flexflix:store` in localStorage. Every mutation appends to `activityLog` automatically.

```typescript
{
  entries: Record<string, WatchlistEntry>      // key: `${mediaType}:${tmdbId}`
  watchLater: Record<string, WatchLaterEntry>
  tvProgress: Record<number, TvShowProgress>   // key: tmdbId
  activityLog: ActivityEvent[]                 // append-only
}
```

### TMDB API Response Types (read-only, mirror actual API responses)

Defined in `shared/api/tmdb-media.ts`, snake_case matching TMDB docs:
```typescript
TmdbPaginatedResponse<T>  // { page, results: T[], total_pages, total_results }
TmdbMovieListItem          // { id, title, poster_path, release_date, genre_ids, vote_average, ... }
TmdbTvListItem             // { id, name, poster_path, first_air_date, genre_ids, ... }
TmdbMultiSearchItem        // Union: movie | tv | person (we filter out person)
TmdbMovieDetails           // Extends list item with genres[], runtime, tagline, etc.
TmdbTvDetails              // Extends list item with seasons[], number_of_episodes, etc.
TmdbSeasonDetails          // { season_number, episodes: TmdbEpisode[] }
TmdbEpisode                // { episode_number, season_number, name, air_date, still_path, ... }
TmdbGenre                  // { id, name }
```

---

## TMDB API Layer

**Auth:** Bearer token via `VITE_TMDB_API_KEY` env variable.
**Rate limiting:** Token bucket (35 tokens, refill 3.5/sec) in `shared/api/tmdb-client.ts`.
**Caching:** TanStack Query with 5-min staleTime, 30-min gcTime, no refetch on window focus.

Key endpoints:
- `GET /search/multi` — search movies + TV (filter out `person` results)
- `GET /movie/{id}`, `GET /tv/{id}` — detail pages
- `GET /tv/{id}/season/{n}` — episode list for season tracker
- `GET /trending/all/week` — trending content for Discover
- `GET /discover/movie`, `GET /discover/tv` — genre-filtered browse
- `GET /genre/movie/list`, `GET /genre/tv/list` — genre mappings (cached 24h)
- `GET /movie/{id}/recommendations`, `GET /tv/{id}/recommendations` — content-based recs (future)

Images: `https://image.tmdb.org/t/p/{size}{path}` — use `w342` for posters, `w1280` for backdrops.

---

## Design System

**Source:** Claude Design project ["FlexFlix Watchlist Manager"](https://claude.ai/design/p/bbf06337-ef19-4d76-a3fd-729bde977af1), design system **Midnight Cinematheque** ("Depth Through Darkness"). Token files: `ds/tokens/{colors,typography,spacing}.css`. Reference component implementations (Badge, Button, IconButton, Input, Tag, ProgressBar, Avatar, MediaCard, GlassRail, Tabs) live in the project's `midnight-cinematheque-design-system-*` bundle.

> **Note:** This section was missing from the original plan — the design link was shared but never captured here, so Phase 3 was first implemented against bare shadcn defaults with no connection to it. Phase 3 has been redone against this spec (see below). The first redo was still based only on the token/component files, not the actual `FlexFlix.dc.html` canvas — that produced wrong guesses (icon-only nav instead of the `Tabs` component's icon+label, a generic centered card instead of the real two-column Login screen). A second pass read `FlexFlix.dc.html` itself plus `ds/ds_bundle.js`/`ds/styles.css`/`support.js` and corrected both. **Always read `FlexFlix.dc.html` directly, not just the token/component files** — it's the authoritative layout for every screen (login, browse, search, watchlist, history, profile, title detail).

### Tokens (dark-only — no light variant is defined)

- **Color:** deep-indigo/midnight surface ladder (`--surface: #060e20` … `--surface-container-highest`), primary = electric indigo (`--primary: #a3a6ff`), secondary = sunset orange (`--secondary: #fd933d`, accents/ratings/progress/active-state), tertiary = soft rose. Borders are "ghost" — low-alpha, never full-opacity lines. Elevation is tonal ("aura") + colored glow, never a plain drop shadow.
- **Typography:** two families — **Manrope** (display/headline/title, weights 600–800, mapped to the `font-heading` Tailwind token) for the cinematic voice, **Inter** (body/label, mapped to `font-sans`) for reading/metadata. Full scale from `display-lg` (72px) down to `label-sm` (11px, uppercase, tracked).
- **Spacing/shape/motion:** 4px spacing scale, `--radius-xl` (12px) for media cards, `--radius-3xl` (28px) for hero/panel containers, `--content-max: 1320px` content rail, soft/emphasis easing curves.

### Component mapping

| Design component | App implementation |
|---|---|
| `Tabs` (icon + label + underline) | `widgets/app-shell/ui/Header.tsx` — sticky glass topbar with centered nav (replaces the left `Sidebar`, which the design doesn't use) |
| `MediaCard` | `entities/media/ui/MediaCard.tsx` — poster + bottom scrim, title bleeds over image, hover = scale + glow |
| Row layout (`fx-row-scroller` / `fx-section-head`) | `entities/media/ui/MediaRow.tsx` — used by Discover's Trending/Popular sections |
| Search hero (`fx-search-hero` / pill input) | `pages/discover/ui/SearchBar.tsx` |
| `Badge`, `Button`, `Input` | `shared/ui/badge.tsx`, `button.tsx`, `input.tsx` — retheme shadcn's own variants to match rather than duplicating a parallel component set |

---

## Implementation Phases

### Phase 0: Scaffold & Foundation
- `npm create vite@latest . -- --template react-ts`
- `npx shadcn@latest init` + install: `button`, `input`, `card`, `sonner`, `separator`
- Install: `@tanstack/react-router`, `@tanstack/router-plugin`, `@tanstack/react-query`, `zustand`
- Dev: `steiger`, `@feature-sliced/steiger-plugin`
- Configure: Vite (Router plugin, path aliases), tsconfig (aliases), `steiger.config.ts`
- Create FSD directories + placeholder route files + `.env`
- **Verify:** `npm run dev` works, all routes show placeholders, `npm run lint:fsd` passes

### Phase 1: Auth + Route Protection
- `shared/api/tmdb-client.ts` — fetch wrapper with Bearer token + rate limiter
- `shared/api/query-client.ts` — TanStack Query config
- `shared/auth/session.ts` — Zustand session store (persist)
- `shared/auth/tmdb-auth.ts` — 3-step auth functions + deleteSession + fetchAccountDetails
- `pages/login/` — LoginPage + LoginForm + useLoginMutation
- `_authenticated.tsx` layout route with beforeLoad auth guard
- Wire `QueryClientProvider` + `Toaster` in `providers.tsx`
- **Verify:** Unauthenticated → redirected to /login. Valid TMDB creds → login → land on /. Session persists on refresh.

### Phase 2: TMDB API + Zustand Stores
- `shared/api/tmdb-media.ts` — all TMDB response types
- `shared/api/tmdb-media-endpoints.ts` — all endpoint functions
- `shared/lib/image.ts` — image URL helpers
- `entities/media/model/media.ts` — MediaType, WatchStatus enums
- `entities/watchlist/model/watchlist.ts` — all local types + ActivityEvent
- `entities/watchlist/model/watchlist-store.ts` — full Zustand store with activity logging
- **Verify:** Store actions work, activity log populates, data survives refresh.

### Phase 3: App Shell + Media Cards + Discover — built against the [Design System](#design-system)
- Retheme `app/styles/globals.css` with Midnight Cinematheque tokens (colors, Manrope/Inter typography, spacing/radius/elevation) — this underpins every later phase, not just this one
- Retheme `shared/ui/button.tsx`, `badge.tsx`, `input.tsx` variants to match the design's Button/Badge/Input specs (pill buttons, tonal badges, pill glass inputs)
- shadcn: `command`, `card`, `badge`, `skeleton`, `scroll-area`, `sheet`, `navigation-menu`, `avatar`, `tooltip`
- `widgets/app-shell/` — AppShell, Header (glass topbar with centered nav, no sidebar), MobileNav
- `entities/media/ui/` — MediaCard (poster + scrim + hover glow), MediaRow (horizontal scroll row), MediaGrid, MediaCardSkeleton, PosterImage
- `features/search-media/` — debounced search hook
- `features/browse-media/` — trending, discover, genre hooks
- `pages/discover/` — DiscoverPage with hero-style SearchBar (pill input), TrendingSection/PopularSection as horizontal scroll rows, SearchResults as a grid
- **Verify:** Login → Discover shows trending. Search works inline. Cards link to detail routes. Visually matches the Midnight Cinematheque design doc (topbar nav, card hover glow, dark cinematic palette).

### Phase 4: Detail Pages + Watchlist Actions
- shadcn: `tabs`, `select`, `tooltip`, `dropdown-menu`, `dialog`, `textarea`
- `entities/media/api/media-queries.ts` — useMovieDetails, useTvDetails
- `features/add-to-watchlist/` — WatchlistButton, StatusSelect, RatingInput
- `features/add-to-watch-later/` — WatchLaterButton
- `pages/movie-detail/` — MovieDetailPage (hero, metadata, actions)
- `pages/show-detail/` — ShowDetailPage (hero, metadata, season list — no episode tracker yet)
- **Verify:** `/movie/550` shows details, add to watchlist persists on refresh, activity log records events.

### Phase 5: Episode Tracking
- shadcn: `accordion`, `checkbox`, `progress`
- `widgets/season-tracker/` — SeasonTracker, SeasonAccordion, EpisodeRow, SeasonProgressBar
- `features/toggle-episode/` — toggle/mark/unmark hooks
- Add `useSeasonDetails` query (lazy fetch on accordion expand)
- Integrate SeasonTracker into ShowDetailPage
- **Verify:** `/tv/1399` → expand Season 1 → check episodes → progress bar fills → persists on refresh.

### Phase 6: Watchlist Page
- `entities/watchlist/model/continue-watching.ts` — next-episode computation
- `entities/media/ui/MediaListItem.tsx` — compact row variant
- `pages/watchlist/` — WatchlistPage with 3 tabs: Continue Watching, Watch Later, All
- Filter by status, sort by date/title/rating on All tab
- Promote from Watch Later to Watchlist action
- Empty state with CTA to Discover
- **Verify:** Full flow: add show → watch episodes → see "Next: S01E04" on Continue Watching. Promote works.

### Phase 7: Profile Page
> `pages/profile/ui/ProfilePage.tsx` already exists as a minimal shell (avatar, username, Log out) — the Phase 3 design-fidelity fix moved logout there because the design's topbar only has Search + Avatar, not a logout icon. Build the rest on top of that file instead of starting from a placeholder.
- `pages/profile/model/profile-stats.ts` — stats computed from store + activity log
- `pages/profile/` — extend ProfilePage with StatsOverview, StatusBreakdown, RecentActivity, GenreDistribution
- Stats: total items, episodes watched, avg rating, status breakdown, genre distribution, recent activity feed
- **Verify:** Stats reflect actual data. Empty state shows zeros gracefully.

### Phase 8: Polish
- Loading skeletons on all pages
- ErrorBoundary + ApiError components
- Toast notifications for all user actions
- Responsive: mobile bottom nav, tablet collapsible sidebar, desktop persistent sidebar
- ~~Dark/light theme toggle~~ — dropped: Midnight Cinematheque is a dark-only design system, no light variant is defined in the source
- Page titles per route
- Logout flow (delete TMDB session + clear store + redirect)
- Session expiry handling (401 → clear + redirect)
- Final Steiger audit

### Phase Dependency
```
0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
```
All sequential. Each phase builds on the previous.

---

## Key Dependencies (npm)

- `@tanstack/react-router` + `@tanstack/router-plugin` — file-based routing
- `@tanstack/react-query` — API caching, deduplication, error retry
- `zustand` — state management + localStorage persistence
- `steiger` + `@feature-sliced/steiger-plugin` — FSD structure linter
- shadcn/ui components (installed via CLI, not npm)

---

## Verification (End-to-End)

1. Open app → redirected to `/login`
2. Enter TMDB credentials → land on Discover page with trending content
3. Search "Breaking Bad" → results appear → click → navigate to `/tv/1399`
4. "Add to Watchlist" → status set to "Watching" → expand Season 1 → mark eps 1-5
5. Navigate to `/watchlist` → "Continue Watching" shows "Next: S01E06"
6. Search "Fight Club" → save to Watch Later → see it in Watchlist > Watch Later tab
7. Promote Fight Club → moves to All tab
8. Go to `/profile` → see stats: 2 items, 5 episodes, status breakdown
9. Recent activity shows all actions
10. Refresh → all state persists
11. Toggle dark mode → all pages correct
12. Logout → session cleared → redirected to `/login`
