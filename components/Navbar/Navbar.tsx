"use client"

import Link from "next/link"
import { Box } from "../ui/Box"
import { Search } from "./Search"

import * as S from "./styles"

export default function NavigationBar() {
  return (
    <S.Navbar>
      <S.NavbarContainer>
        <Link href="/">Trending</Link>
        <Link href="/watch-list">Watchlist</Link>
        <Search />
      </S.NavbarContainer>
    </S.Navbar>
  )
}
