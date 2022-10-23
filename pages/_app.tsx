import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import Layout from '../components/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react';
import { Database } from '../lib/supabase/database.types';

function MyApp({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </SessionContextProvider>
  )
}

export default MyApp
