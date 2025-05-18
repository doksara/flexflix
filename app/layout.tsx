import { Providers } from "./providers"
import "./global.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-color-mode="light">
      <body>
        <Providers>{children}</Providers>
        <div id="portals" />
      </body>
    </html>
  )
}
