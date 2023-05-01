import React, { useState } from "react"

interface SearchContextState {
  query: string
  searchHandler: (s: string) => void
}

const searchContextState: SearchContextState = {
  query: "",
  searchHandler: () => {},
}

export const SearchContext =
  React.createContext<SearchContextState>(searchContextState)

interface SearchContextProviderProps {
  children: React.ReactNode
}

const SearchContextProvider = (props: SearchContextProviderProps) => {
  const [query, setQuery] = useState("")

  const searchHandler = (query: string) => {
    setQuery(query)
  }

  return (
    <SearchContext.Provider
      value={{ query: query, searchHandler: searchHandler }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
