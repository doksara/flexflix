"use client"

import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
} from "@nextui-org/react"
import type { NextPage } from "next"
import { IconUser } from "../../components/icons/IconUser"
import { useState } from "react"
import { IconUnlock } from "../../components/icons/IconUnlock"
import { IconLock } from "../../components/icons/IconLock"
import { useSupabase } from "../supabase-provider"

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { supabase } = useSupabase()

  const onLogin = async () => {
    setIsLoading(true)

    const res = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    console.log({ res })

    setIsLoading(false)
  }

  const handleSignUp = async () => {
    setIsLoading(true)

    const res = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    console.log({ res })

    setIsLoading(false)
  }

  return (
    <Container css={{ mt: "48px" }} display="flex" justify="center">
      <Grid.Container gap={4} justify="center">
        {/** Registration form */}
        <Grid xs={4}>
          <Card css={{ mw: "340px" }}>
            <Card.Body>
              <Grid.Container gap={3}>
                <Grid xs={12}>
                  <Input
                    labelPlaceholder="Email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    css={{ w: "100%" }}
                    contentRight={<IconUser fill="#11181C" />}
                  />
                </Grid>
                <Grid xs={12}>
                  <Input.Password
                    labelPlaceholder="Password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    css={{ w: "100%" }}
                    visibleIcon={<IconUnlock fill="currentColor" />}
                    hiddenIcon={<IconLock fill="currentColor" />}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button
                    disabled={isLoading}
                    onPress={handleSignUp}
                    color="primary"
                    css={{ px: "$13", w: "100%" }}
                  >
                    {isLoading ? (
                      <Loading color="currentColor" size="sm" />
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>

        {/** Login form */}
        <Grid xs={4}>
          <Card css={{ mw: "340px" }}>
            <Card.Body>
              <Grid.Container gap={4}>
                <Grid xs={12}>
                  <Input
                    labelPlaceholder="Email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    css={{ w: "100%" }}
                    contentRight={<IconUser fill="#11181C" />}
                  />
                </Grid>
                <Grid xs={12}>
                  <Input.Password
                    labelPlaceholder="Password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    css={{ w: "100%" }}
                    visibleIcon={<IconUnlock fill="currentColor" />}
                    hiddenIcon={<IconLock fill="currentColor" />}
                  />
                </Grid>

                <Grid xs={12}>
                  <Button
                    disabled={isLoading}
                    onPress={onLogin}
                    color="primary"
                    css={{ px: "$13", w: "100%" }}
                  >
                    {isLoading ? (
                      <Loading color="currentColor" size="sm" />
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

export default Login
