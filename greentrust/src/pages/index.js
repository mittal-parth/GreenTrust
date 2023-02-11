import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Auth, useAuth } from "@arcana/auth-react";
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isLoggedIn){
      console.log(auth.user);
    }
  }, [auth?.user]);

  const onLogin = async () => {
    console.log("Logged in with address: " + auth.provider);
    const info = await auth.getUser()
     console.log(auth.getUser());

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
