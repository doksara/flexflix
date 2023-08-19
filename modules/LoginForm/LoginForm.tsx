import { Input } from "components/Input"
import { Text } from "components/Text"
import Link from "next/link"
import { Box, VStack } from "styled-system/jsx"
import * as S from "./styles"
import FormButton from "./components/FormButton"

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  return (
    <VStack alignItems="flex-start">
      <Text variant="heading">Sign in to your account</Text>
      <Text variant="caption">
        Not a member? <Link href="/register">Register here.</Link>
      </Text>
      <S.Form action="/auth/sign-in" method="post" mt={4}>
        <VStack gap={2} alignItems="stretch">
          <Input
            label="Email"
            name="email"
            placeholder="john.doe@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
          />
          <Box alignSelf="flex-end" my={2}>
            <Link href="/forgot-password">Forgot password?</Link>
          </Box>
          <FormButton type="submit">Sign In</FormButton>
        </VStack>
      </S.Form>
    </VStack>
  )
}

export default LoginForm
