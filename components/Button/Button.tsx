import React from "react"
import * as S from "./styles"
import { ButtonProps } from "./interface"
import { Spinner } from "components/Spinner"

const Button = ({ children, loading, type = "button" }: ButtonProps) => {
  return (
    <S.Button type={type}>
      {loading && <Spinner />}
      {children}
    </S.Button>
  )
}

export default Button
