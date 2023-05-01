"use client"

import { useRouter, useServerInsertedHTML } from "next/navigation"
import { CssBaseline } from "@nextui-org/react"
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { createContext, useContext, useEffect, useState } from "react"
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
  const router = useRouter()
  const [client] = useState(() => createBrowserSupabaseClient<Database>())

  useEffect(() => {
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, client])

  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <SupabaseContext.Provider value={{ client }}>
      <NextUIProvider>
        <SearchContextProvider>{children}</SearchContextProvider>
      </NextUIProvider>
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
