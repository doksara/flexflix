"use client"

import { Button, ButtonProps } from "components/Button"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

const FormButton = (props: ButtonProps) => {
  const { pending } = useFormStatus()

  return <Button {...props} loading={pending} disabled={pending} />
}

export default FormButton
