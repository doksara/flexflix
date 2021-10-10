using flexflix.Models.Tmdb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Services.TmdbApi
{
    public interface ITmdbApiService
    {
        Task<TmdbResponse<TmdbTvShow>> GetTopRated();
        Task<TmdbResponse<TmdbTvShow>> GetPopular();
        Task<TmdbResponse<TmdbTvShow>> GetTvAiringToday();
        Task<TmdbResponse<TmdbTvShow>> GetTvOnTheAir();
        Task<TmdbSeason> GetSeasonDetails(int tmdbTvShowId, int seasonNumber);
        Task<TmdbTvShowDetails> GetTvShowDetails(int tmdbTvShowId);
        Task<TmdbConfiguration> GetConfiguration();
    }
}
