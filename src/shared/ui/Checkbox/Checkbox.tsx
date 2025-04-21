import { ChangeEventHandler } from "react"
import * as S from "./styles"

export interface CheckboxProps {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  return (
    <S.Label>
      <S.Input type="checkbox" value={value} onChange={onChange} />
      {label}
    </S.Label>
  )
}

export default Checkbox
