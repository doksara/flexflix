'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { CssBaseline } from '@nextui-org/react'
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import SearchContextProvider from "../context/SearchContext"
import { Database } from "../lib/supabase/database.types"

interface ProviderProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
  
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <NextUIProvider>
        <SearchContextProvider>
          {children}
        </SearchContextProvider>
      </NextUIProvider>
    </SessionContextProvider>
  )
}