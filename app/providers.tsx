"use client"

import { ThemeProvider } from "styled-components"
import SearchContextProvider from "../context/SearchContext"
import { theme } from "../styles/theme"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchContextProvider>
        {children}
      </SearchContextProvider>
    </ThemeProvider>
  )
}
