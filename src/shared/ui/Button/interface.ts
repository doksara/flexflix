import { ReactNode } from "react"

type HtmlButtonType = "button" | "submit" | "reset" | undefined

export interface ButtonProps {
  children: ReactNode
  type?: HtmlButtonType
  loading?: boolean
  disabled?: boolean
}
