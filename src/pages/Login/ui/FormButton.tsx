"use client"

import { Button, ButtonProps } from "@/shared/ui"
import { useFormStatus } from "react-dom"

export const FormButton = (props: ButtonProps) => {
  const { pending } = useFormStatus()

  return <Button {...props} loading={pending} disabled={pending} />
}
