using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models
{
    public class TvShow
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Title { get; set; }
        public decimal Rating { get; set; }
        public string Year { get; set; }
        public string Plot { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
        public string PosterImage { get; set; }
        public string BackdropImage { get; set; }
        public int NumberOfEpisodes { get; set; }
        public int NumberOfSeasons { get; set; }
        public virtual ICollection<Genre> Genres { get; set; }
        public virtual ICollection<Season> Seasons { get; set; }
    }
}
