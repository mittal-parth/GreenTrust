import { createContext, useContext, useState, useRef, useEffect } from "react";
import { MANTLE_NETWORK_CONFIG } from "@/config";

const AuthContext = createContext(null);

const ProvideAuth = ({ children, provider }) => {
  const auth = useProvideAuth(provider);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = (auth) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableLogins, setAvailableLogins] = useState([]);
  const [user, setUser] = useState(null);
  const providerRef = useRef(auth.provider);

  const loginWithSocial = async (p) => {
    await auth.init();
    await auth.loginWithSocial(p);
  };

  const loginWithLink = async (email) => {
    await auth.init();
    return auth.loginWithLink(email);
  };

  const logout = async () => {
    if (await auth.isLoggedIn()) {
      await auth.logout();
    }
  };

  const connect = async () => {
    return await auth.connect();
  };

  const onConnectHook = async () => {
    setLoading(true);
    const info = await auth.getUser();
    setIsLoggedIn(true);
    const loggedIn = await auth.isLoggedIn();
    if (loggedIn && auth.provider.chainId !== MANTLE_NETWORK_CONFIG.chainId) {
      await switchNetwork();
    }
    setUser(info);
    setLoading(false);
  };

  const onDisconnectHook = () => {
    setIsLoggedIn(false);
  };

  const switchNetwork = async () => {
    try {
      await auth.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MANTLE_NETWORK_CONFIG.chainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await auth.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              MANTLE_NETWORK_CONFIG,
            ],
          });
          await switchNetwork();
        } catch (addError) {
          console.error(addError, "Add mantle testnet error");
        }
      } else {
        console.error(error, "Switch to mantle testnet error");
      }
    }
  };

  useEffect(() => {
    auth.provider.on("connect", onConnectHook);
    auth.provider.on("disconnect", onDisconnectHook);
    auth.init().then(async () => {
      try {
        const loggedIn = await auth.isLoggedIn();
        if (loggedIn) {
          const info = await auth.getUser();
          setIsLoggedIn(true);
          if (auth.provider.chainId !== MANTLE_NETWORK_CONFIG.chainId) {
            await switchNetwork();
          }
          setUser(info);
        } else {
          const logins = await auth.getLogins();
          setAvailableLogins(logins.filter((l) => l != "passwordless"));
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    });
    return () => {
      auth.provider.removeListener("connect", onConnectHook);
      auth.provider.removeListener("disconnect", onDisconnectHook);
    };
  }, []);

  return {
    availableLogins,
    loading,
    loginWithLink,
    loginWithSocial,
    logout,
    provider: providerRef.current,
    isLoggedIn,
    user,
    appId: auth.appId,
    connect,
  };
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("`useAuth` Hook must be used inside `ProvideAuth`");
  }
  return context;
};

export { useAuth, ProvideAuth };
