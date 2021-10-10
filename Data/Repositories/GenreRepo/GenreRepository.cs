using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.GenreRepo
{
    public class GenreRepository : Repository<Genre>, IGenreRepository
    {
        protected FlexflixContext flexflixContext => _context as FlexflixContext;

        public GenreRepository(FlexflixContext context) : base(context) { }

        public Genre GetByTmdbId(int tmdbId)
        {
            return _entities.FirstOrDefault(_ => _.TmdbId == tmdbId);
        }
    }
}
