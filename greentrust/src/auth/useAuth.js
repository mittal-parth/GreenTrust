import { createContext, useContext, useState, useRef, useEffect } from "react";

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
    const info = await auth.getUser();
    setUser(info);
    setIsLoggedIn(true);
  };

  const onDisconnectHook = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    auth.provider.on("connect", onConnectHook);
    auth.provider.on("disconnect", onDisconnectHook);
    auth.init().then(async () => {
      const loggedIn = await auth.isLoggedIn();
      if (loggedIn) {
        const info = await auth.getUser();
        setUser(info);
        setIsLoggedIn(true);
      } else {
        const logins = await auth.getLogins();
        setAvailableLogins(logins.filter((l) => l != "passwordless"));
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
