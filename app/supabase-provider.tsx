"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  Session,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../lib/supabase/database.types"

export type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const [client] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()

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

  return (
    <Context.Provider value={{ supabase: client, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
