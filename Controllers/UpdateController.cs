using AutoMapper;
using flexflix.Data.Repositories.ActorRepo;
using flexflix.Data.Repositories.EpisodeActorRepo;
using flexflix.Data.Repositories.GenreRepo;
using flexflix.Data.Repositories.TvShowRepo;
using flexflix.Models;
using flexflix.Services.Storage;
using flexflix.Services.TmdbApi;
using flexflix.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Controllers
{
    public class UpdateController : Controller
    {
        private readonly ITmdbApiService _tmdbApiService;
        private readonly IFileStorageService _fileStorageService;
        private readonly ITvShowRepository _tvShowRepository;
        private readonly IGenreRepository _genreRepository;
        private readonly IActorRepository _actorRepository;
        private readonly IEpisodeActorRepository _episodeActorRepository;
        private readonly IMapper _mapper;

        public UpdateController(
            ITmdbApiService tmdbApiService, 
            IFileStorageService fileStorageService, 
            ITvShowRepository tvShowRepository,
            IGenreRepository genreRepository,
            IActorRepository actorRepository,
            IEpisodeActorRepository episodeActorRepository,
            IMapper mapper)
        {
            _tmdbApiService = tmdbApiService;
            _fileStorageService = fileStorageService;
            _tvShowRepository = tvShowRepository;
            _genreRepository = genreRepository;
            _actorRepository = actorRepository;
            _episodeActorRepository = episodeActorRepository;
            _mapper = mapper;
        }
        // this should be changed to POST
        [HttpGet("/top_rated")]
        public async Task<IActionResult> UpdateTopRated()
        {
            var topRatedTvShows = await _tmdbApiService.GetTopRated();
            var rowsAffected = 0;

            foreach (var _tvShow in topRatedTvShows.results)
            {
                var existingTvShow = _tvShowRepository.GetByTmdbId(_tvShow.id);

                if (existingTvShow == null)
                {
                    var tvShowDetails = await _tmdbApiService.GetTvShowDetails(_tvShow.id);
                    var tvShow = _mapper.Map<TvShow>(tvShowDetails);

                    if (_tvShow.backdrop_path != null)
                    {
                        var backdropImageUrl = UrlBuilder.GenerateBackdropImageUrl(_tvShow.backdrop_path);
                        var uploadedBackdropPath = _fileStorageService.Upload(backdropImageUrl);

                        tvShow.BackdropImage = uploadedBackdropPath;
                    }

                    if (_tvShow.poster_path != null)
                    {
                        var posterImageUrl = UrlBuilder.GeneratePosterImageUrl(_tvShow.poster_path);
                        var uploadedPosterPath = _fileStorageService.Upload(posterImageUrl);

                        tvShow.PosterImage = uploadedPosterPath;
                    }

                    List<Genre> tvShowGenres = new List<Genre>();

                    foreach (var _genre in tvShowDetails.genres)
                    {
                        var existingGenre = _genreRepository.GetByTmdbId(_genre.id);

                        if (existingGenre != null)
                        {
                            tvShowGenres.Add(existingGenre);
                        } else
                        {
                            var newGenre = _mapper.Map<Genre>(_genre);
                            tvShowGenres.Add(newGenre);
                        }
                    }

                    tvShow.Genres = tvShowGenres;

                    List<Season> tvShowSeasons = new List<Season>();
                    foreach (var _season in tvShowDetails.seasons)
                    {
                        var seasonDetails = await _tmdbApiService.GetSeasonDetails(_tvShow.id, _season.season_number);
                        List<Episode> seasonEpisodes = new List<Episode>();

                        foreach (var _episode in seasonDetails.episodes)
                        {
                            var episode = _mapper.Map<Episode>(_episode);

                            foreach (var _actor in _episode.crew)
                            {
                                EpisodeActor _episodeActor = new EpisodeActor
                                {
                                    Department = _actor.known_for_department,
                                    Character = _actor.character
                                };

                                var existingActor = _actorRepository.GetByTmdbId(_actor.id);

                                if (existingActor == null)
                                {
                                    var newActor = _mapper.Map<Actor>(_actor);
                                    _episodeActor.Actor = newActor;
                                    _actorRepository.Add(newActor);
                                    _actorRepository.SaveChanges();
                                } else
                                {
                                    _episodeActor.Actor = existingActor;
                                }

                                _episodeActor.Episode = episode;
                                _actorRepository.SaveChanges();
                            }

                            if (_episode.still_path != null)
                            {
                                var stillImageUrl = UrlBuilder.GeneratePosterImageUrl(_episode.still_path);
                                var uploadedStillPath = _fileStorageService.Upload(stillImageUrl);

                                episode.StillImage = uploadedStillPath;
                            }

                            seasonEpisodes.Add(episode);
                        }

                        var season = _mapper.Map<Season>(_season);

                        if (_season.poster_path != null)
                        {
                            var posterImageUrl = UrlBuilder.GeneratePosterImageUrl(_season.poster_path);
                            var uploadedPosterPath = _fileStorageService.Upload(posterImageUrl);

                            season.PosterImage = uploadedPosterPath;
                        }

                        season.Episodes = seasonEpisodes;
                        season.EpisodeCount = seasonEpisodes.Count;
                     
                        tvShowSeasons.Add(season);
                    }

                    tvShow.Seasons = tvShowSeasons;

                    _tvShowRepository.Add(tvShow);
                    _tvShowRepository.SaveChanges();

                    rowsAffected++;
                }
            }

            return Ok(rowsAffected);
        }

        [HttpGet("single/{id}")]
        public async Task<IActionResult> UpdateSingle([FromRoute] int id)
        {
            var rowsAffected = 1;

            var existingTvShow = _tvShowRepository.GetByTmdbId(id);

            if (existingTvShow == null)
            {
                var tvShowDetails = await _tmdbApiService.GetTvShowDetails(id);
                var tvShow = _mapper.Map<TvShow>(tvShowDetails);

                if (tvShowDetails.backdrop_path != null)
                {
                    var backdropImageUrl = UrlBuilder.GenerateBackdropImageUrl(tvShowDetails.backdrop_path);
                    var uploadedBackdropPath = _fileStorageService.Upload(backdropImageUrl);

                    tvShow.BackdropImage = uploadedBackdropPath;
                }

                if (tvShowDetails.poster_path != null)
                {
                    var posterImageUrl = UrlBuilder.GeneratePosterImageUrl(tvShowDetails.poster_path);
                    var uploadedPosterPath = _fileStorageService.Upload(posterImageUrl);

                    tvShow.PosterImage = uploadedPosterPath;
                }

                List<Genre> tvShowGenres = new List<Genre>();

                foreach (var _genre in tvShowDetails.genres)
                {
                    var existingGenre = _genreRepository.GetByTmdbId(_genre.id);

                    if (existingGenre != null)
                    {
                        tvShowGenres.Add(existingGenre);
                    }
                    else
                    {
                        var newGenre = _mapper.Map<Genre>(_genre);
                        tvShowGenres.Add(newGenre);
                    }
                }

                tvShow.Genres = tvShowGenres;

                List<Season> tvShowSeasons = new List<Season>();
                foreach (var _season in tvShowDetails.seasons)
                {
                    var seasonDetails = await _tmdbApiService.GetSeasonDetails(tvShowDetails.id, _season.season_number);
                    List<Episode> seasonEpisodes = new List<Episode>();

                    foreach (var _episode in seasonDetails.episodes)
                    {
                        var episode = _mapper.Map<Episode>(_episode);

                        foreach (var _actor in _episode.crew)
                        {
                            EpisodeActor _episodeActor = new EpisodeActor
                            {
                                Department = _actor.known_for_department,
                                Character = _actor.character
                            };

                            var existingActor = _actorRepository.GetByTmdbId(_actor.id);

                            if (existingActor == null)
                            {
                                var newActor = _mapper.Map<Actor>(_actor);

                                if (_actor.profile_path != null)
                                {
                                    var profileImageUrl = UrlBuilder.GenerateProfileImageUrl(_actor.profile_path);
                                    var uploadedPosterPath = _fileStorageService.Upload(profileImageUrl);

                                    newActor.ProfileImage = uploadedPosterPath;
                                }

                                _episodeActor.Actor = newActor;
                                _actorRepository.Add(newActor);
                                _actorRepository.SaveChanges();
                            }
                            else
                            {
                                _episodeActor.Actor = existingActor;
                            }

                            _episodeActor.Episode = episode;
                            _episodeActorRepository.SaveChanges();
                        }

                        if (_episode.still_path != null)
                        {
                            var stillImageUrl = UrlBuilder.GeneratePosterImageUrl(_episode.still_path);
                            var uploadedStillPath = _fileStorageService.Upload(stillImageUrl);

                            episode.StillImage = uploadedStillPath;
                        }

                        seasonEpisodes.Add(episode);
                    }

                    var season = _mapper.Map<Season>(_season);

                    if (_season.poster_path != null)
                    {
                        var posterImageUrl = UrlBuilder.GeneratePosterImageUrl(_season.poster_path);
                        var uploadedPosterPath = _fileStorageService.Upload(posterImageUrl);

                        season.PosterImage = uploadedPosterPath;
                    }

                    season.Episodes = seasonEpisodes;
                    season.EpisodeCount = seasonEpisodes.Count;

                    tvShowSeasons.Add(season);
                }

                tvShow.Seasons = tvShowSeasons;

                _tvShowRepository.Add(tvShow);
                _tvShowRepository.SaveChanges();
            }

            return Ok(rowsAffected);
        }
    }
}
