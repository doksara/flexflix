import { Navbar } from "@/modules/Navbar"
import { Providers } from "./providers"
import "./global.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
