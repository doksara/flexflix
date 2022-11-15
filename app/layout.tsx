import { Navbar } from "../components/Navbar"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <Navbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
