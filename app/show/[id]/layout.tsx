import { Header } from "@/widgets/Header"

export default function ShowLayout({
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
