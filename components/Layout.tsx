import { Avatar, Dropdown, Input, Navbar, Text } from '@nextui-org/react'
import React from 'react'
import { SearchIcon } from './icons/SearchIcon'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="/">
              Trending
            </Navbar.Link>
            <Navbar.Link href="/login">Login</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
      </Navbar>
      <main>{children}</main>
    </>
  )
}