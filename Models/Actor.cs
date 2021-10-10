using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models
{
    public class Actor
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string FullName { get; set; }
        public string ProfileImage { get; set; }
        public bool IsAdult { get; set; }
        public int Gender { get; set; }
        public virtual ICollection<EpisodeActor> Episodes { get; set; }
    }
}
