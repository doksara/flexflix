"use client"

import { SWRConfig } from "swr"
import SearchContextProvider from "../src/context/SearchContext"
import { getJson } from "utils"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <SWRConfig value={{ fetcher: getJson }}>
      <SearchContextProvider>{children}</SearchContextProvider>
    </SWRConfig>
  )
}
