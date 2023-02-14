import "@/styles/globals.css";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import { appAddress } from "@/config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "@/components/Layout";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const provider = new AuthProvider(`${appAddress}`, {
    theme: "light",
    alwaysVisible: false,
    network: "testnet", // network can be testnet or mainnet - defaults to testnet
    chainConfig: {
      chainId: CHAIN.ETHEREUM_GOERLI,
      rpcUrl: "",
    },
  });
  return (
    <Layout>
      <ProvideAuth provider={provider}>
        <Component {...pageProps} />
      </ProvideAuth>
    </Layout>
  );
}
