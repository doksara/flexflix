import { Avatar, Dropdown, Input, Navbar, Text } from '@nextui-org/react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { Key } from 'react'
import { SearchIcon } from './icons/SearchIcon'
import { Link } from './Link/Link'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const user = useUser()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  const handleAction = async (key: Key) => {
    if (key === 'logout') {
      await supabaseClient.auth.signOut()
      router.push('/login')
    }
  }

  return (
    <>
      <Navbar maxWidth="md" isBordered variant="sticky">
        <Navbar.Content hideIn="xs" variant="highlight">
          <Link href="/" css={{ marginRight: '10px' }}>
            Trending
          </Link>

          {!user && <Link href="/login">Login</Link> }
        </Navbar.Content>
        <Navbar.Content 
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            aria-label='Search for TV Shows'
            clearable
            contentLeft={
              <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
            }
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          />
        </Navbar.Item>
          {user && 
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="primary"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                onAction={handleAction}
                variant="shadow"
              >
              <Dropdown.Item key="profile">
                {user.email}
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
          </Navbar.Content>
      </Navbar>
      <main>{children}</main>
    </>
  )
}