import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type * as Stitches from "@stitches/react";
import { styled } from "@nextui-org/react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  css?: Stitches.CSS;
}

const NavStyle = styled("span", {
  display: "flex",
  alignItems: "center",
  lineHeight: "inherit",
  textDecoration: "none",
  width: "fitContent",
  backgroundColor: "transparent",
  backgroundImage: "inherit",
  backgroundClip: "inherit",
  color: "#353637",
  outline: "none",
  maxWidth: "max-content",

  "&[aria-current]": {
    color: "#0072f5",
    fontWeight: "600",
  },
});

const NavLink = ({ href, children, css }: NavLinkProps) => {
  const router = useRouter();

  return (
    <NavStyle
      css={css}
      aria-current={router.pathname === href ? "page" : undefined}
    >
      {children}
    </NavStyle>
  );
};

export { NavLink as Link };
