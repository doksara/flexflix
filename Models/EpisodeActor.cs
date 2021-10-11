using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models
{
    public class EpisodeActor
    {
        public int EpisodeId { get; set; }
        public virtual Episode Episode { get; set; }

        public int ActorId { get; set; }
        public virtual Actor Actor { get; set; }

        public string Character { get; set; }
        public string Department { get; set; }
    }
}
