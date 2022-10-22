import { GetServerSideProps, NextPage } from "next"
import { getJson } from ".."
import { SeasonDetails, TvShowDetails } from '../../interface'
import { EpisodeOverview } from "../../modules/EpisodeOverview/EpisodeOverview"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const seasonNumber = 0 // TODO - fix this
  const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US&page=1`

  const season = await getJson<SeasonDetails>(seasonUrl)

  return {
    props: {
      show: tvShow,
      season: season
    }
  }
}

interface TvShowDetailsProps {
  show: TvShowDetails,
  season: SeasonDetails
}

const TvShowDetails: NextPage<TvShowDetailsProps> = ({ show, season }) => {
  return (
    <EpisodeOverview season={season} />
  )
}

export default TvShowDetails