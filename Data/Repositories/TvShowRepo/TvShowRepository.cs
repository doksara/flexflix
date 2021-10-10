using flexflix.Data;
using flexflix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Data.Repositories.TvShowRepo
{
    public class TvShowRepository : Repository<TvShow>, ITvShowRepository
    {
        protected FlexflixContext flexflixContext => _context as FlexflixContext;

        public TvShowRepository(FlexflixContext context) : base(context) { }

        public TvShow GetByTmdbId(int tmdbId)
        {
            return _entities.FirstOrDefault(_ => _.TmdbId == tmdbId);
        }
    }
}
