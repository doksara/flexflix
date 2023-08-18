import { Navbar } from "components/Navbar"
import StyledComponentsRegistry from "lib/registry"
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
        <StyledComponentsRegistry>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
