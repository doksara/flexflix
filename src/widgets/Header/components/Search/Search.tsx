"use client"

import { useMemo, useState } from "react"
import { Input } from "@/shared/ui"
import { Box } from "styled-system/jsx"
import { useSearchMulti } from "@/entities/Search"
import debounce from "lodash/debounce"

export const Search = () => {
  const [query, setQuery] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const { data, isLoading, error } = useSearchMulti(searchQuery)

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value)
      }, 200),
    []
  )

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <Box position="relative" flexGrow={0.25} zIndex="100" bg="gray.1">
      <Input
        value={query}
        placeholder="Search TV shows, movies ..."
        onChange={handleQueryChange}
      />

      {data && (
        <Box position="absolute" top="100%" left={0} right={0} bottom={0}>
          {data.results.map((show) => (
            <Box key={show.id}>{show.name}</Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Search
