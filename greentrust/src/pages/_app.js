import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { APP_ADDRESS } from "@/config";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {AuthContext} from "@/context/authContext";


config.autoAddCss = false;


export default function App({ Component, pageProps }) {
  const [loadingAuth, setLoadingAuth] = useState(true);

  const authProvider = new AuthProvider(`${APP_ADDRESS}`, {
    theme: "light",
    alwaysVisible: false,
    network: "testnet", // network can be testnet or mainnet - defaults to testnet
    chainConfig: {
      chainId: CHAIN.ETHEREUM_GOERLI,
      rpcUrl: "",
    },
  });

  async function initAuth() {
    try {
      await authProvider.init();
    }
    catch (err) {
      console.log('Error initializing authProvider:', err);
    }
    finally {
      setLoadingAuth(false);
    }
  }
  
  useEffect(() => {
    initAuth();
  }, [])

  const router = useRouter();
  
  return (
    <>
      <ProvideAuth provider={authProvider}>
        <AuthContext.Provider value={{loadingAuth, authProvider}}>
              {router.pathname === "/auth/login" || router.pathname === "/"
                ? (<Component {...pageProps} />)
                : (<Layout>
                  <Component {...pageProps} />
                </Layout>)
              }
        </AuthContext.Provider>
      </ProvideAuth>
    </>
  );
}
