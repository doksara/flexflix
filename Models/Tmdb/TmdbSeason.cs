using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbSeason : TmdbTvShowSeason
    {
        public TmdbSeason()
        {

        }

        public List<TmdbTvShowEpisode<TmdbSeasonCrewMember, TmdbSeasonGuestStar>> episodes { get; set; }
    }
}
