import "@/styles/globals.css";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { appAddress } from "@/config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "@/components/Layout";
import("next/app").AppProps;
config.autoAddCss = false;

export default function App({ Component, pageProps, ...appProps }) {
  const provider = new AuthProvider(`${appAddress}`);

  if ([`/landing`].includes(appProps.router.pathname))
    return <Component {...pageProps}/>

  return (
    <Layout>
      <ProvideAuth provider={provider}>
        <Component {...pageProps} />
      </ProvideAuth>
    </Layout>
  );
}
