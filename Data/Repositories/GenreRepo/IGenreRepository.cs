using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.GenreRepo
{
    public interface IGenreRepository : IRepository<Genre>
    {
        Genre GetByTmdbId(int tmdbId);
    }
}
