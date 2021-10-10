using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbTvShowGuestStar
    {
        public TmdbTvShowGuestStar()
        {

        }

        public int id { get; set; }
        public string name { get; set; }
        public int credit_id { get; set; }
        public string character { get; set; }
        public int order { get; set; }
        public string profile_path { get; set; }
    }
}
