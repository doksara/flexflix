import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import { Navbar } from "../components/Navbar"
import { GlobalStyle } from "./globalStyles"
import { Providers } from "./providers"
import SupabaseProvider from "./supabase-provider"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html>
      <body>
        <GlobalStyle />
        <SupabaseProvider session={session}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </SupabaseProvider>
      </body>
    </html>
  )
}
