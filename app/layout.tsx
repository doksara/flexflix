import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"
import { ThemeProvider } from "styled-components"
import { Navbar } from "../components/Navbar"
import StyledComponentsRegistry from "../lib/registry"
import { Providers } from "./providers"
import SupabaseProvider from "./supabase-provider"
import "./global.css"

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
        <StyledComponentsRegistry>
          <SupabaseProvider session={session}>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </SupabaseProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
