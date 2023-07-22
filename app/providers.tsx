"use client"

import { ThemeProvider } from "styled-components"
import SearchContextProvider from "../context/SearchContext"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return <SearchContextProvider>{children}</SearchContextProvider>
}
