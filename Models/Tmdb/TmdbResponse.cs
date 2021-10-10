using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbResponse<T>
    {
        public TmdbResponse()
        {

        }

        public int page { get; set; }
        public List<T> results { get; set; }
        public int total_results { get; set; }
        public int total_pages { get; set; }
    }
}
