using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbConfiguration
    {
        public TmdbConfiguration()
        {

        }

        public TmdbImageConfiguration images { get; set; }
        public List<string> change_keys { get; set; }
    }
}
