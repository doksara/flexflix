import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import Layout from '../components/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react';
import { Database } from '../lib/supabase/database.types';
import SearchContextProvider from '../context/SearchContext';

function MyApp({ Component, pageProps }: AppProps<{initialSession: Session}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider>
        <SearchContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchContextProvider>
      </NextUIProvider>
    </SessionContextProvider>
  )
}

export default MyApp
