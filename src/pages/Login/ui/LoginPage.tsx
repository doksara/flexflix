import LoginForm from "./LoginForm"
import { Container } from "../../../../styled-system/jsx"
import Messages from "./Messages"

interface LoginPageProps {
  action: (formData: FormData) => Promise<void>
}

export const LoginPage = ({ action }: LoginPageProps) => {
  return (
    <Container
      maxW="md"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <LoginForm action={action} />
      <Messages />
    </Container>
  )
}
