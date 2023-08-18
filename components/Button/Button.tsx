import React, { ReactNode } from "react"
import * as S from "./styles"

type HtmlButtonType = "button" | "submit" | "reset" | undefined

interface ButtonProps {
  children: ReactNode
  type?: HtmlButtonType
}

const Button = ({ children, type = "button" }: ButtonProps) => {
  return <S.Button type={type}>{children}</S.Button>
}

export default Button
