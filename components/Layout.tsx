import { Navbar } from '@nextui-org/react'
import React from 'react'
import { SearchIcon } from './icons/SearchIcon'
import { Link } from './Link/Link'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar maxWidth="md" isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Link href="/" css={{ marginRight: '10px' }}>
              Trending
            </Link>
            <Link href="/login">
              Login
            </Link>
          </Navbar.Content>
        </Navbar.Brand>
      </Navbar>
      <main>{children}</main>
    </>
  )
}