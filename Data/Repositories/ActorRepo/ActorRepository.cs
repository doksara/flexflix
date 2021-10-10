using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.ActorRepo
{
    public class ActorRepository : Repository<Actor>, IActorRepository
    {
        protected FlexflixContext flexflixContext => _context as FlexflixContext;

        public ActorRepository(FlexflixContext context) : base(context) { }

        public Actor GetByTmdbId(int tmdbId)
        {
            return _entities.FirstOrDefault(_ => _.TmdbId == tmdbId);
        }
    }
}
