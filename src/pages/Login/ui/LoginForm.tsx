import Link from "next/link"
import { Input, Text } from "@/shared/ui"
import { FormButton } from "./FormButton"
import { Box, VStack, styled } from "styled-system/jsx"

interface LoginFormProps {
  action: (formData: FormData) => Promise<void>
}

const LoginForm = ({ action }: LoginFormProps) => {
  return (
    <VStack alignItems="flex-start">
      <Text variant="heading">Sign in to your account</Text>
      <Text variant="caption">
        Not a member? <Link href="/register">Register here.</Link>
      </Text>
      <styled.form action={action} mt={4}>
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
      </styled.form>
    </VStack>
  )
}

export default LoginForm
