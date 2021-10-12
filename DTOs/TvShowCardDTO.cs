using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.DTOs
{
    public class TvShowCardDTO
    {
        public TvShowCardDTO()
        {

        }

        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Rating { get; set; }
        public string ImageUrl { get; set; }
        public int SeasonCount { get; set; }
    }
}
