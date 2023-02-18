import { useRouter } from "next/router";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "react-multi-carousel/lib/styles.css";

import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import { getAuth } from "@/auth/getArcanaAuth";
import { ProvideAuth } from "@/auth/useAuth";

config.autoAddCss = false;
const authProvider = getAuth();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Green Trust</title>
      </Head>
      <ProvideAuth provider={authProvider}>
        {router.pathname === "/auth/login" || router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ProvideAuth>
    </>
  );
}
