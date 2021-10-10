using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.TvShowRepo
{
    public interface ITvShowRepository : IRepository<TvShow>
    {
        TvShow GetByTmdbId(int tmdbId);
    }
}
