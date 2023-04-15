import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '@/context/AuthUserContext'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}
