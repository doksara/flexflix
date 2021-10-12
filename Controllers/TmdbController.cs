using flexflix.Models.Tmdb;
using flexflix.Services.TmdbApi;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Controllers
{
    public class TmdbController : Controller
    {
        private readonly ITmdbApiService _tmdbApiService;

        public TmdbController(ITmdbApiService tmdbApiService)
        {
            _tmdbApiService = tmdbApiService;
        }

        [HttpGet("/tvshow/top_rated")]
        public async Task<IActionResult> GetTopRated()
        {
            var response = await _tmdbApiService.GetTopRated();

            return Ok(response);
        }

        [HttpGet("/tvshow/popular")]
        public async Task<IActionResult> GetPopular()
        {
            var response = await _tmdbApiService.GetPopular();

            return Ok(response);
        }

        [HttpGet("/tvshow/airing_today")]
        public async Task<IActionResult> GetTvAiringToday()
        {
            var response = await _tmdbApiService.GetTvAiringToday();

            return Ok(response);
        }

        [HttpGet("/tvshow/on_the_air")]
        public async Task<IActionResult> GetTvOnTheAir()
        {
            var response = await _tmdbApiService.GetTvOnTheAir();

            return Ok(response);
        }

        [HttpGet("/tvshow/{showId}")]
        public async Task<IActionResult> GetSeasonDetails(int showId)
        {
            var response = await _tmdbApiService.GetTvShowDetails(showId);

            return Ok(response);
        }

        [HttpGet("/tvshow/{showId}/season/{seasonNumber}")]
        public async Task<IActionResult> GetSeasonDetails(int showId, int seasonNumber)
        {
            var response = await _tmdbApiService.GetSeasonDetails(showId, seasonNumber);

            return Ok(response);
        }

        [HttpGet("/configuration")]
        public async Task<IActionResult> GetConfiguration()
        {
            var response = await _tmdbApiService.GetConfiguration();

            return Ok(response);
        }

        [HttpGet("/search/tv")]
        public async Task<IActionResult> GetConfiguration([FromQuery] string keyword)
        {
            var response = await _tmdbApiService.SearchTvShowsByKeyword(keyword);

            return Ok(response);
        }
    }
}
