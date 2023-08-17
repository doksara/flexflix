import { ChangeEventHandler } from "react"
import * as S from "./styles"

interface CheckboxProps {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  console.log("Rerendering checkbox")
  return (
    <S.Label>
      <S.Input type="checkbox" value={value} onChange={onChange} />
      {label}
    </S.Label>
  )
}

export default Checkbox
