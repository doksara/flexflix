import type { NextPage } from "next"
import { LoginPage } from "@/pages/Login"
import { login } from "./actions"

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  return <LoginPage action={login} />
}

export default Login
