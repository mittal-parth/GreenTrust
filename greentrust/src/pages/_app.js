import '@/styles/globals.css'
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { appAddress } from '@/config';

export default function App({ Component, pageProps }) {
  const provider = new AuthProvider(`${appAddress}`)
  return (
    <ProvideAuth provider={provider}>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}
