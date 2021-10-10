using AutoMapper;
using flexflix.DTOs;
using flexflix.Models;
using flexflix.Models.Tmdb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flexflix.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateUserDTO, TvShow>();

            CreateMap<TmdbGenre, Genre>().ForMember(dst => dst.TmdbId,
                                                    opt => opt.MapFrom(src => src.id))
                                         .ForMember(dst => dst.Id,
                                                    opt => opt.Ignore());

            CreateMap<TmdbSeasonCrewMember, Actor>().ForMember(dst => dst.TmdbId,
                                                    opt => opt.MapFrom(src => src.id))
                                         .ForMember(dst => dst.Id,
                                                    opt => opt.Ignore())
                                         .ForMember(dst => dst.FullName,
                                                    opt => opt.MapFrom(src => src.name))
                                         .ForMember(dst => dst.IsAdult,
                                                    opt => opt.MapFrom(src => src.adult))
                                         .ForMember(dst => dst.Gender,
                                                    opt => opt.MapFrom(src => src.gender));

            CreateMap<TmdbTvShowSeason, Season>().ForMember(dst => dst.TmdbId,
                                                    opt => opt.MapFrom(src => src.id))
                                                 .ForMember(dst => dst.Id,
                                                    opt => opt.Ignore())
                                                 .ForMember(dst => dst.AirDate,
                                                    opt => opt.MapFrom(src => src.air_date))
                                                 .ForMember(dst => dst.Description,
                                                    opt => opt.MapFrom(src => src.overview))
                                                 .ForMember(dst => dst.PosterImage,
                                                    opt => opt.MapFrom(src => src.poster_path))
                                                 .ForMember(dst => dst.SeasonNumber,
                                                    opt => opt.MapFrom(src => src.season_number));

            CreateMap<TmdbTvShowEpisode<TmdbSeasonCrewMember, TmdbSeasonGuestStar>, Episode>()
                                            .ForMember(dst => dst.TmdbId,
                                                    opt => opt.MapFrom(src => src.id))
                                            .ForMember(dst => dst.Id,
                                                    opt => opt.Ignore())
                                            .ForMember(dst => dst.Rating,
                                                    opt => opt.MapFrom(src => src.vote_average))
                                            .ForMember(dst => dst.SeasonNumber,
                                                    opt => opt.MapFrom(src => src.season_number))
                                            .ForMember(dst => dst.EpisodeNumber,
                                                    opt => opt.MapFrom(src => src.episode_number))
                                            .ForMember(dst => dst.StillImage,
                                                    opt => opt.MapFrom(src => src.still_path))
                                            .ForMember(dst => dst.Title,
                                                    opt => opt.MapFrom(src => src.name))
                                            .ForMember(dst => dst.AirDate,
                                                    opt => opt.MapFrom(src => src.air_date))
                                            .ForMember(dst => dst.Description,
                                                    opt => opt.MapFrom(src => src.overview))
                                            .ForMember(dst => dst.Actors,
                                                    opt => opt.Ignore());

            CreateMap<TmdbTvShowDetails, TvShow>().ForMember(dst => dst.Plot,
                                                      opt => opt.MapFrom(src => src.overview))
                                           .ForMember(dst => dst.Title,
                                                      opt => opt.MapFrom(src => src.name))
                                           .ForMember(dst => dst.Rating,
                                                      opt => opt.MapFrom(src => src.vote_average))
                                           .ForMember(dst => dst.Country,
                                                      opt => opt.MapFrom(src => src.origin_country.First()))
                                           .ForMember(dst => dst.Language,
                                                      opt => opt.MapFrom(src => src.original_language))
                                           .ForMember(dst => dst.Year,
                                                      opt => opt.MapFrom(src => src.first_air_date))
                                           .ForMember(dst => dst.NumberOfEpisodes,
                                                      opt => opt.MapFrom(src => src.number_of_episodes))
                                           .ForMember(dst => dst.NumberOfSeasons,
                                                      opt => opt.MapFrom(src => src.number_of_seasons))
                                           .ForMember(dst => dst.TmdbId,
                                                    opt => opt.MapFrom(src => src.id))
                                           .ForMember(dst => dst.Id,
                                                    opt => opt.Ignore())
                                           .ForMember(dst => dst.Seasons,
                                                      opt => opt.Ignore())
                                           .ForMember(dst => dst.Genres,
                                                      opt => opt.Ignore());
            CreateMap<CreateUserDTO, User>().ForMember(dst => dst.CreatedAt,
                                                    opt => opt.MapFrom(src => DateTime.Now))
                                            .ForMember(dst => dst.Discriminator,
                                                    opt => opt.MapFrom(src => "Default"));
        }
    }
}
