using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models
{
    public class Episode
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AirDate { get; set; }
        public int EpisodeNumber { get; set; }
        public int SeasonNumber { get; set; }
        public string StillImage { get; set; }
        public decimal Rating { get; set; }
        public virtual ICollection<EpisodeActor> Actors { get; set; }
    }
}
