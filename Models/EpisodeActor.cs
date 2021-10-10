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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        public string Character { get; set; }
        public string Department { get; set; }
        public virtual Episode Episode { get; set; }
        public virtual Actor Actor { get; set; }
    }
}
