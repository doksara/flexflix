using flexflix.Models;
using flexflix.Models.Tmdb;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace flexflix.Services.TmdbApi
{
    public class TmdbApiService : ITmdbApiService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;

        public TmdbApiService(IConfiguration configuration, IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
        }

        public async Task<TmdbResponse<TmdbTvShow>> GetTvOnTheAir()
        {
            return await GetTvShows("on_the_air");
        }

        public async Task<TmdbResponse<TmdbTvShow>> GetTvAiringToday()
        {
            return await GetTvShows("airing_today");
        }


        public async Task<TmdbResponse<TmdbTvShow>> GetPopular()
        {
            return await GetTvShows("popular");
        }

        public async Task<TmdbResponse<TmdbTvShow>> GetTopRated()
        {
            return await GetTvShows("top_rated");
        }

        private async Task<TmdbResponse<TmdbTvShow>> GetTvShows(string subUrl)
        {
            string baseUrl = "https://api.themoviedb.org/3/tv";

            var queryParams = new Dictionary<string, string>()
            {
                { "api_key", _configuration.GetSection("Tmdb:Key").Value },
                { "language", "en-US"  },
                { "page", "1" }
            };

            var url = QueryHelpers.AddQueryString($"{baseUrl}/{subUrl}", queryParams);
            var httpClient = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            var response = await httpClient.SendAsync(request);
            using var content = await response.Content.ReadAsStreamAsync();
            var deserializedContent = await JsonSerializer.DeserializeAsync<TmdbResponse<TmdbTvShow>>(content);

            return deserializedContent;
        }

        public async Task<TmdbSeason> GetSeasonDetails(int tmdbTvShowId, int seasonNumber)
        {
            string baseUrl = "https://api.themoviedb.org/3/tv";

            var queryParams = new Dictionary<string, string>()
            {
                { "api_key", _configuration.GetSection("Tmdb:Key").Value },
                { "language", "en-US"  }
            };

            var url = QueryHelpers.AddQueryString($"{baseUrl}/{tmdbTvShowId}/season/{seasonNumber}", queryParams);
            var httpClient = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            var response = await httpClient.SendAsync(request);
            using var content = await response.Content.ReadAsStreamAsync();
            var deserializedContent = await JsonSerializer.DeserializeAsync<TmdbSeason>(content);

            return deserializedContent;
        }

        public async Task<TmdbTvShowDetails> GetTvShowDetails(int tmdbTvShowId)
        {
            string baseUrl = "https://api.themoviedb.org/3/tv";

            var queryParams = new Dictionary<string, string>()
            {
                { "api_key", _configuration.GetSection("Tmdb:Key").Value }
            };

            var url = QueryHelpers.AddQueryString($"{baseUrl}/{tmdbTvShowId}", queryParams);
            var httpClient = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            var response = await httpClient.SendAsync(request);
            using var content = await response.Content.ReadAsStreamAsync();
            var deserializedContent = await JsonSerializer.DeserializeAsync<TmdbTvShowDetails>(content);

            return deserializedContent;
        }

        public async Task<TmdbConfiguration> GetConfiguration()
        {
            string baseUrl = "https://api.themoviedb.org/3/configuration";

            var queryParams = new Dictionary<string, string>()
            {
                { "api_key", _configuration.GetSection("Tmdb:Key").Value }
            };

            var url = QueryHelpers.AddQueryString($"{baseUrl}", queryParams);
            var httpClient = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            var response = await httpClient.SendAsync(request);
            using var content = await response.Content.ReadAsStreamAsync();
            var deserializedContent = await JsonSerializer.DeserializeAsync<TmdbConfiguration>(content);

            return deserializedContent;
        }
    }
}
