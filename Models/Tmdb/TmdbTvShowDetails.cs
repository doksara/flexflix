using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Models.Tmdb
{
    public class TmdbTvShowDetails : TmdbTvShow
    {
        public TmdbTvShowDetails()
        {

        }

        public List<TmdbCreator> created_by { get; set; }
        public List<int> episode_run_time { get; set; }
        public List<TmdbGenre> genres { get; set; }
        public string homepage { get; set; }
        public bool in_production { get; set; }
        public List<string> languages { get; set; }
        public string last_air_date { get; set; }
        public TmdbTvShow last_episode_to_air { get; set; }
        public TmdbTvShow next_episode_to_air { get; set; }
        public List<TmdbNetwork> networks { get; set; }
        public int number_of_episodes { get; set; }
        public int number_of_seasons { get; set; }
        public List<TmdbNetwork> production_companies { get; set; }
        public List<TmdbCountry> production_countries { get; set; }
        public List<TmdbTvShowSeason> seasons { get; set; }
        public List<TmdbLanguage> spoken_languages { get; set; }
        public string status { get; set; }
        public string tagline { get; set; }
        public string type { get; set; }
    }
}
