import {
  Navbar,
  Dropdown,
  Avatar,
  Input,
  Link as StyledLink,
} from "@nextui-org/react"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Key } from "react"
import { useSupabase } from "../../app/supabase-provider"
import { Search } from "./Search"

export default async function NavigationBar() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const { data } = await supabase.auth.getUser()
  console.log(data.user)

  const handleAction = async (key: Key) => {
    if (key === "logout") {
      await supabase.auth.signOut()
    }
  }

  /* return (
    <Navbar maxWidth="md" isBordered variant="sticky">
      <Navbar.Content hideIn="xs" gap={8} variant="highlight">
        <Link href="/" passHref>
          Trending
        </Link>

        {!data.user && <Link href="/login">Login</Link>}
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
          <Search />
        </Navbar.Item>
        {data.user && (
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
              <Dropdown.Item key="profile">{data.user.email}</Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Content>
    </Navbar> 
  ) */

  return (
    <>
      <p>{data.user.email}</p>
    </>
  )
}
