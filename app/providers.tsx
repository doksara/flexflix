"use client"

import { SWRConfig } from "swr"
import { getJson } from "@/shared/lib/http"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return <SWRConfig value={{ fetcher: getJson }}>{children}</SWRConfig>
}
