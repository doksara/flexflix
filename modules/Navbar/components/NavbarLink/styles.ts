import Link from "next/link"
import { css } from "styled-system/css"
import { styled } from "styled-system/jsx"

export const activeStyle = css({ background: "#C64855" })

export const NavbarLink = styled(Link, {
  base: {
    paddingX: 2,
    paddingY: 1.5,
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "#ffffff",
    transition: "background-color 0.1s linear",

    _hover: { color: "#ffffff", backgroundColor: "#C64855" },
  },
})
