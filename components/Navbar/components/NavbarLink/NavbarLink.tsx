"use client"

import { usePathname } from "next/navigation"
import Link, { LinkProps } from "next/link"
import React, { PropsWithChildren, useMemo } from "react"
import { css } from "styled-system/css"
import * as S from "./styles"

type ActiveLinkProps = LinkProps & {
  className?: string
}

const ActiveLink = ({
  children,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const asPath = usePathname()

  const isActive = useMemo(() => {
    if (asPath) {
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname

      const activePathname = new URL(asPath, location.href).pathname

      return linkPathname === activePathname
    }

    return false
  }, [asPath, props.as, props.href])

  return (
    <S.NavbarLink
      className={css(isActive ? { background: "#C64855" } : {})}
      {...props}
    >
      {children}
    </S.NavbarLink>
  )
}

export default ActiveLink
