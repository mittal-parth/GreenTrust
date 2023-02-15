import "@/styles/globals.css";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { appAddress } from "@/config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "@/components/Layout";
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from "react";
import Spinner from "@/components/Spinner";
import AuthContext from "@/context/authLoadingContext";
import { AuthLoading } from "@/context/authLoadingContext";

config.autoAddCss = false;


export default function App({ Component, pageProps }) {
  const [authLoading, setAuthLoading] = useContext(AuthLoading);
  
  const authProvider = new AuthProvider(`${appAddress}`, {
    theme: "light",
    alwaysVisible: false,
    network: "testnet", // network can be testnet or mainnet - defaults to testnet
    chainConfig: {
      chainId: CHAIN.ETHEREUM_GOERLI,
      rpcUrl: "",
    },
  });

  async function initAuth() {
    setAuthLoading(true);
    try {
      await authProvider.init();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setAuthLoading(false);
    }
  }
  
  useEffect(() => {
    initAuth();
  }, [])

  const router = useRouter();

  return (
    <>
      {authLoading
        ? <Spinner></Spinner>
        : (<ProvideAuth provider={authProvider}>
          <AuthContext>
          {router.pathname === "/auth/login"
            ? (<Component {...pageProps} />)
            : (<Layout>
              <Component {...pageProps} />
            </Layout>)
          } 
          </AuthContext>
        </ProvideAuth>)
      }
    </>
  );
}
