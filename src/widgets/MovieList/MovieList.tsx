import Link from "next/link"
import { TvListResultObject } from "@/shared/lib/tmdb/interface"
import { MovieCard } from "@/entities/TvShow"
import { Grid, GridItem } from "styled-system/jsx"

interface MovieListProps {
  movies: TvListResultObject[]
}

//  getJson<ApiResponse<TvListResultObject>>(`api/search/popular`)

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Grid columns={6} gap={3}>
      {movies.map((show) => (
        <GridItem key={show.id} colSpan={1} rowSpan={1} height="300px">
          <Link
            passHref
            href={`/show/${encodeURIComponent(show.id)}`}
            style={{ display: "flex", height: "100%" }}
          >
            <MovieCard
              title={show.first_air_date}
              subtitle={show.name}
              imgSrc={show.poster_path}
            />
          </Link>
        </GridItem>
      ))}
    </Grid>
  )
}

export default MovieList
