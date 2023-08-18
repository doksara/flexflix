import LoginForm from "modules/LoginForm/LoginForm"
import type { NextPage } from "next"
import { Box, Container } from "styled-system/jsx"
import Messages from "./messages"

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  return (
    <Container maxW="xl">
      <LoginForm />
      <Messages />
    </Container>
  )
}

export default Login
