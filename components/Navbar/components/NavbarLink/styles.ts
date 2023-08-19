import Link from "next/link"
import { styled } from "styled-system/jsx"

export const NavbarLink = styled(Link, {
  base: {
    paddingX: 2,
    paddingY: 1.5,
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "#D1D5DB",

    _hover: { color: "#ffffff", backgroundColor: "#374151" },
  },
})
