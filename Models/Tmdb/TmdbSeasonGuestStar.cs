using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbSeasonGuestStar : TmdbTvShowGuestStar
    {
        public TmdbSeasonGuestStar()
        {

        }

        public string job { get; set; }
        public bool adult { get; set; }
        public decimal popularity { get; set; }
        public string known_for_department { get; set; }
        public string original_name { get; set; }
    }
}
