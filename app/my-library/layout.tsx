import { Header } from "@/widgets/Header"

export default function MyLibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      {children}
    </>
  )
}
