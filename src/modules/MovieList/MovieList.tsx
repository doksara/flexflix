/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Link from "next/link"
import { useCallback, useContext, useEffect, useState } from "react"
import { SearchContext } from "@/context/SearchContext"
import { ApiResponse, TvListResultObject } from "@/core/api/interface"
import debounce from "lodash/debounce"
import { getJson } from "utils"
import { MovieCard } from "@/entities/TvShow"
import { Grid, GridItem } from "styled-system/jsx"

interface MovieListProps {}

const MovieList = (props: MovieListProps) => {
  const [searchResults, setSearchResults] = useState<TvListResultObject[]>([])
  const { query } = useContext(SearchContext)

  const applySearchResults = useCallback(
    debounce((query) => {
      if (query) {
        getJson<ApiResponse<TvListResultObject>>(`api/search/${query}`).then(
          (res) => {
            setSearchResults(res.results)
          }
        )
      }
    }, 3000),
    []
  )

  useEffect(() => {
    getJson<ApiResponse<TvListResultObject>>(`api/search/popular`)
      .then((res) => {
        setSearchResults(res.results)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    applySearchResults(query)
  }, [query])

  return (
    <Grid columns={6} gap={3}>
      {searchResults.map((show) => (
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
