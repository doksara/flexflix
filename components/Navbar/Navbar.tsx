"use client"

import Link from "next/link"
import { Container } from "../../styled-system/jsx"
import { Search } from "./Search"

import * as S from "./styles"

export default function NavigationBar() {
  return (
    <S.Navbar>
      <Container paddingY={2}>
        <Link href="/">Trending</Link>
        <Link href="/watch-list">Watchlist</Link>
        <Search />
      </Container>
    </S.Navbar>
  )
}
