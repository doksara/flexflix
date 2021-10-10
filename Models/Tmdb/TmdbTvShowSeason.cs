using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbTvShowSeason
    {
        public TmdbTvShowSeason()
        {

        }

        public string _id { get; set; }
        public string air_date { get; set; }
        public string name { get; set; }
        public string overview { get; set; }
        public int id { get; set; }
        public string poster_path { get; set; }
        public int season_number { get; set; }
    }
}
