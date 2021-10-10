﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbTvShow
    {
        public TmdbTvShow()
        {

        }

        public string poster_path { get; set; }
        public decimal popularity { get; set; }
        public int id { get; set; }
        public string backdrop_path { get; set; }
        public decimal vote_average { get; set; }
        public string overview { get; set; }
        public string first_air_date { get; set; }
        public List<string> origin_country { get; set; }
        public List<int> genre_ids { get; set; }
        public string original_language { get; set; }
        public int vote_count { get; set; }
        public string name { get; set; }
        public string original_name { get; set; }
    }
}
