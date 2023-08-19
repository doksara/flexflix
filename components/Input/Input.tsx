import { ChangeEventHandler, HTMLInputTypeAttribute } from "react"
import { Box } from "styled-system/jsx"
import * as S from "./styles"

interface InputProps {
  label: string
  name: string
  value?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <Box w="100%">
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.Field
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  )
}

export default Input
