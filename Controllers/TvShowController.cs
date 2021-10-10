using AutoMapper;
using flexflix.Data.Repositories.TvShowRepo;
using flexflix.DTOs;
using flexflix.Models;
using flexflix.Models.Tmdb;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace flexflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TvShowController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITvShowRepository _tvShowRepository;

        public TvShowController(IMapper mapper, ITvShowRepository tvShowRepository)
        {
            _mapper = mapper;
            _tvShowRepository = tvShowRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDTO tvShowToCreate)
        {
            var newTvShow = _mapper.Map<TvShow>(tvShowToCreate);

            _tvShowRepository.Add(newTvShow);
            await _tvShowRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tvShows = _tvShowRepository.GetAll();

            return Ok(tvShows);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(string id)
        {
            return Ok();
        }
    }
}
