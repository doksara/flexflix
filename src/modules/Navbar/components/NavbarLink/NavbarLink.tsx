"use client"

import { usePathname } from "next/navigation"
import { LinkProps } from "next/link"
import React, { PropsWithChildren } from "react"
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
  const isActive = asPath === props.href

  return (
    <S.NavbarLink className={isActive ? S.activeStyle : undefined} {...props}>
      {children}
    </S.NavbarLink>
  )
}

export default ActiveLink
