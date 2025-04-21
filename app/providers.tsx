"use client"

import SearchContextProvider from "../src/context/SearchContext"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return <SearchContextProvider>{children}</SearchContextProvider>
}
