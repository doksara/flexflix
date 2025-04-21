import { Container, HStack } from "styled-system/jsx"
import LogoutButton from "./components/LogoutButton/LogoutButton"
import { Search } from "./components/Search/Search"

import * as S from "./styles"
import { NavbarLink } from "./components/NavbarLink"

export default function Navbar() {
  return (
    <S.Navbar>
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
    </S.Navbar>
  )
}
