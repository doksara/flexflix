import React, { useState, Dispatch, SetStateAction } from "react"

interface SearchContextState {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const SearchContext =
  React.createContext<SearchContextState>({} as SearchContextState)

interface SearchContextProviderProps {
  children: React.ReactNode
}

const SearchContextProvider = (props: SearchContextProviderProps) => {
  const [query, setQuery] = useState("")

  return (
    <SearchContext.Provider
      value={{ query: query, setQuery: setQuery }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
