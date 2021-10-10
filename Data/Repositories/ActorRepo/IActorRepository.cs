using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.ActorRepo
{
    public interface IActorRepository : IRepository<Actor>
    {
        Actor GetByTmdbId(int tmdbId);
    }
}
