import { Auth, useAuth } from "@arcana/auth-react";
import { useEffect } from "react";
import { useRouter } from 'next/router'

export default function SignIn() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isLoggedIn){
      router.push("/");
    }
  }, [auth?.isLoggedIn]);

  const onLogin = async () => {
    console.log(auth.user)
  };
  const logout = async()=>{
    await auth.logout();
  }
  return (
    <>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <div>
        Logged In
        <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
        </div>
      )}
    </>
  )
}