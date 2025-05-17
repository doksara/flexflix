import Link from "next/link"
import { FormButton } from "./FormButton"
import { Box, VStack, styled } from "styled-system/jsx"
import { Card, Field } from "@/shared/ui"

interface LoginFormProps {
  action: (formData: FormData) => Promise<void>
}

const LoginForm = ({ action }: LoginFormProps) => {
  return (
    <styled.form action={action} w="100%">
      <Card.Root>
        <Card.Header>
          <Card.Title>Sign in to your account</Card.Title>
          <Card.Description>
            Not a member? <Link href="/register">Register here.</Link>
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap={2} alignItems="stretch">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Field.Input
                name="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Field.Input
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Field.Root>
          </VStack>
        </Card.Body>
        <Card.Footer>
          <Box alignSelf="flex-end" my={2}>
            <Link href="/forgot-password">Forgot password?</Link>
          </Box>
          <FormButton type="submit">Sign In</FormButton>
        </Card.Footer>
      </Card.Root>
    </styled.form>
  )
}

export default LoginForm
