import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { Button, Card, Container, Grid, Input, Loading } from "@nextui-org/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { UserIcon } from "../components/icons/UserIcon";
import { useState } from 'react';

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const supabaseClient = useSupabaseClient()

  const onLogin = async () => {
    setIsLoading(true)
    
    const { data, error } = await supabaseClient
      .auth
      .signInWithOtp({
        email: email
      })

    setIsLoading(false)
    console.log(data)
  }

  return (
    <Container css={{ mt: '48px' }} display='flex' justify='center'>
      <Card css={{ mw: '320px' }}>
        <Card.Body>
          <Grid.Container gap={4}>
            <Grid xs={12}>
              <Input
                labelPlaceholder="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                css={{ w: "100%" }}
                contentRight={<UserIcon fill="#11181C" />}
              />
            </Grid>
            <Grid xs={12}>
              <Button disabled={isLoading} onPress={onLogin} color="primary" css={{ px: "$13", w: "100%" }}>
                {isLoading 
                  ? <Loading color="currentColor" size="sm" />
                  : <span>Login</span>
                }
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
