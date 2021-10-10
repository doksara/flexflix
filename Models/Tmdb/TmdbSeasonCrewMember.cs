using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbSeasonCrewMember : TmdbTvShowCrewMember
    {
        public TmdbSeasonCrewMember()
        {

        }

        public int gender { get; set; }
        public string character { get; set; }
        public bool adult { get; set; }
        public decimal popularity { get; set; }
        public string known_for_department { get; set; }
        public string original_name { get; set; }
    }
}
