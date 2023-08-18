import { ChangeEventHandler, HTMLInputTypeAttribute } from "react"
import { Box } from "styled-system/jsx"
import * as S from "./styles"

interface InputProps {
  label: string
  name: string
  value?: string
  type?: HTMLInputTypeAttribute
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = ({ label, name, value, type = "text", onChange }: InputProps) => {
  return (
    <Box>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.Field type={type} name={name} value={value} onChange={onChange} />
    </Box>
  )
}

export default Input
