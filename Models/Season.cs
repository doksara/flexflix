using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models
{
    public class Season
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Name { get; set; }
        public DateTime AirDate { get; set; }
        public string Description { get; set; }
        public int EpisodeCount { get; set; }
        public int SeasonNumber { get; set; }
        public string PosterImage { get; set; }
        public virtual ICollection<Episode> Episodes { get; set; }
    }
}
