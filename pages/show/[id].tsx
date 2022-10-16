import { GetServerSideProps, NextPage } from "next";
import { getJson } from "..";
import { TvShowDetails } from '../../interface'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  return {
    props: {
      show: tvShow
    }
  }
}

interface TvShowDetailsProps {
  show: TvShowDetails
}

const TvShowDetails: NextPage<TvShowDetailsProps> = ({ show }) => {
  return (
    <p>{show.name}</p>
  )
}

export default TvShowDetails