import { Button } from "components/Button"
import { Input } from "components/Input"
import { VStack } from "styled-system/jsx"

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  return (
    <form action="/auth/sign-in" method="post">
      <VStack gap={2}>
        <Input label="Email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button type="submit">Submit</Button>
      </VStack>
    </form>
  )
}

export default LoginForm
