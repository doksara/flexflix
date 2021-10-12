using AutoMapper;
using flexflix.Data;
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

        [HttpGet]
        public IActionResult GetAll()
        {
            var tvShowModels = _tvShowRepository.GetAll().ToList();
            var tvShowViewModels = _mapper.Map<List<TvShow>, List<TvShowCardDTO>>(tvShowModels);

            return Ok(tvShowViewModels);
        }

        [HttpGet("{id}")]
        public IActionResult GetSingle(string id)
        {
            var tvShowModel = _tvShowRepository.Get(id);

            if (tvShowModel != null)
            {
                var tvShowViewModel = _mapper.Map<TvShow, TvShowCardDTO>(tvShowModel);

                return Ok(tvShowViewModel);
            }

            return NotFound();
        }
    }
}
