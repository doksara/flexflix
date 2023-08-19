import { ReactNode } from "react"
import * as S from "./styles"

export type TextVariant = "heading" | "body" | "caption"

export interface TextProps {
  children: ReactNode
  variant?: TextVariant
}

const Text = ({ children, variant = "body" }: TextProps) => {
  return <S.Text variant={variant}>{children}</S.Text>
}

export default Text
