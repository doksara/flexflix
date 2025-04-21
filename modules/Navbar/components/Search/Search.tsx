import React from "react"
import { IconSearch } from "@/shared/ui"
import { Box } from "styled-system/jsx"
import * as S from "./styles"

export const Search = () => {
  return (
    <Box flexGrow={0.25}>
      <S.Label htmlFor="search">Search</S.Label>
      <Box position="relative">
        <S.IconWrapper>
          <IconSearch fill="grey" />
        </S.IconWrapper>
        <S.Input
          type="search"
          id="search"
          placeholder="Search TV shows.."
          required
        />

        {/** Enable submission with enter key */}
        <input type="submit" hidden />
      </Box>
    </Box>
  )
}

export default Search
