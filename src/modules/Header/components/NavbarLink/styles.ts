import Link from "next/link"
import { css } from "styled-system/css"
import { styled } from "styled-system/jsx"

export const activeStyle = css({
  color: "#ffffff",
  background: "slack.9",
})

export const NavbarLink = styled(Link, {
  base: {
    paddingX: 2,
    paddingY: 1.5,
    borderRadius: "8px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "gray.12",
    transition: "all 0.15s linear",

    _hover: { color: "#ffffff", backgroundColor: "slack.10" },
  },
})
