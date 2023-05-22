"use client"

import { useServerInsertedHTML } from "next/navigation"
import { CssBaseline } from "@nextui-org/react"
import { NextUIProvider } from "@nextui-org/react"
import { createContext } from "react"
import SearchContextProvider from "../context/SearchContext"

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../lib/supabase/database.types"

type SupabaseContext = {
  client: SupabaseClient<Database>
}

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined)

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <NextUIProvider>
      <SearchContextProvider>{children}</SearchContextProvider>
    </NextUIProvider>
  )
}
