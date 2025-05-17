import type { Metadata, NextPage } from "next"
import { LoginPage } from "@/pages/Login"
import { login } from "./actions"

interface LoginProps {}

export const metadata: Metadata = {
  title: "Login :: flexflix",
  description: "Login to your account",
}

const Login: NextPage<LoginProps> = () => {
  return <LoginPage action={login} />
}

export default Login
