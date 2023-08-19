import Link from "next/link"
import { Container, HStack } from "styled-system/jsx"
import LogoutButton from "./components/LogoutButton/LogoutButton"
import { Search } from "./Search"

import * as S from "./styles"
import { NavbarLink } from "./components/NavbarLink"

export default function Navbar() {
  return (
    <S.Navbar>
      <Container paddingY={2}>
        <HStack>
          <NavbarLink href="/">Trending</NavbarLink>
          <NavbarLink href="/my-library">My Library</NavbarLink>
          <Search />
          <LogoutButton />
        </HStack>
      </Container>
    </S.Navbar>
  )
}
