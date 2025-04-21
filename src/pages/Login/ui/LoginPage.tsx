import LoginForm from "./LoginForm"
import { Container } from "../../../../styled-system/jsx"
import Messages from "./Messages"

interface LoginPageProps {
  action: (formData: FormData) => Promise<void>
}

export const LoginPage = ({ action }: LoginPageProps) => {
  return (
    <Container maxW="md">
      <LoginForm action={action} />
      <Messages />
    </Container>
  )
}
