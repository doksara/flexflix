"use client"

import { ThemeProvider } from "styled-components"
import { theme } from "../styles/theme"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
