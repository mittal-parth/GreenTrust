import { AuthProvider, CHAIN } from "@arcana/auth";
import { APP_ADDRESS } from "@/config";

const auth = new AuthProvider(APP_ADDRESS, {
  theme: "light",
  alwaysVisible: true,
    network: "testnet", // network can be testnet or mainnet - defaults to testnet
    chainConfig: {
      chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
      rpcUrl: "",
    },
});

const getAuth = () => {
  return auth;
};

export { getAuth };
