import { Container, HStack, styled } from "styled-system/jsx"
import LogoutButton from "./components/LogoutButton/LogoutButton"
import { Search } from "./components/Search/Search"
import { NavbarLink } from "./components/NavbarLink"

export default function Header() {
  return (
    <styled.header bg="colorPalette.2" borderBottom="1px solid {colors.gray.6}">
      <Container paddingY={3}>
        <HStack justifyContent="space-between">
          <HStack alignItems="center">
            <NavbarLink href="/">Home</NavbarLink>
            <NavbarLink href="/my-library">My Library</NavbarLink>
          </HStack>

          <Search />

          <LogoutButton />
        </HStack>
      </Container>
    </styled.header>
  )
}
