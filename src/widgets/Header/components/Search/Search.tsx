"use client"

import { useMemo, useState } from "react"
import { Input, Text, Image, Heading } from "@/shared/ui"
import { Box, Flex, styled } from "styled-system/jsx"
import { useSearchMulti } from "@/entities/Search"
import debounce from "lodash/debounce"
import Link from "next/link"
import { getImagePath, getReleaseYear } from "utils"

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
        <styled.ul
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bottom={0}
          borderRadius="sm"
          mt="xs"
          h="360px"
          overflowY="auto"
        >
          {data.results.map((show) => (
            <styled.li
              key={show.id}
              py="xs"
              px="sm"
              bg="gray.1"
              _hover={{ bg: "gray.2" }}
            >
              <Link href={`/show/${show.id}`}>
                <Flex justifyContent="space-between">
                  <Flex gap="xs">
                    <Heading as="h3">{show.name || show.title}</Heading>

                    {show.first_air_date && (
                      <Text>({getReleaseYear(show.first_air_date)})</Text>
                    )}
                  </Flex>

                  <Box
                    position="relative"
                    maxWidth="4xl"
                    w="100%"
                    height="6xl"
                    borderRadius="sm"
                  >
                    {show.poster_path && (
                      <Image
                        src={getImagePath(show.poster_path)}
                        alt={show.name || show.title || ""}
                        fill
                      />
                    )}
                  </Box>
                </Flex>
              </Link>
            </styled.li>
          ))}
        </styled.ul>
      )}
    </Box>
  )
}

export default Search
