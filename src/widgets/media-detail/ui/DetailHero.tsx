import { Fragment, type ReactNode } from "react";

import type { MediaSummary } from "@/entities/media";
import { PosterImage } from "@/entities/media";

interface DetailHeroProps {
  media: MediaSummary;
  backdropSrc: string | null;
  typeLabel: string;
  metaItems: string[];
  overview: string;
  actions: ReactNode;
}

export function DetailHero({ media, backdropSrc, typeLabel, metaItems, overview, actions }: DetailHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-container)]">
      {backdropSrc && (
        <img src={backdropSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0" style={{ background: "var(--scrim-hero)" }} />
      <div className="relative grid grid-cols-[160px_1fr] gap-6 p-6 sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-10 md:grid-cols-[248px_1fr]">
        <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-[var(--surface-variant)] shadow-[var(--aura-lg)]">
          <PosterImage posterPath={media.posterPath} title={media.title} fill />
        </div>
        <div className="flex flex-col justify-end gap-3 pb-1">
          <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-secondary uppercase">
            {typeLabel}
          </span>
          <h1 className="font-heading text-[2.25rem] leading-[1.08] font-bold tracking-[-0.015em] text-white sm:text-[3rem]">
            {media.title}
          </h1>
          {metaItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-[var(--on-surface-variant)]">
              {metaItems.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 && <span>·</span>}
                  <span>{item}</span>
                </Fragment>
              ))}
            </div>
          )}
          {overview && (
            <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-foreground">{overview}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3">{actions}</div>
        </div>
      </div>
    </div>
  );
}
