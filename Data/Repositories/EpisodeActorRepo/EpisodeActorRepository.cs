using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.EpisodeActorRepo
{
    public class EpisodeActorRepository : Repository<EpisodeActor>, IEpisodeActorRepository
    {
        protected FlexflixContext flexflixContext => _context as FlexflixContext;

        public EpisodeActorRepository(FlexflixContext context) : base(context) { }
    }
}
