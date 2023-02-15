import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useState } from "react";
import { useContext } from "react";

import { Auth, useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";

import Navbar from "./Navbar";
import classes from "../style";
import Spinner from "./Spinner";
import { AuthContext } from "@/context/authContext";

export function ArcanaAuth() {
  const router = useRouter();
  const auth = useAuth();

  const { loadingAuth, authProvider } = useContext(AuthContext);
  
  // useEffect(() => {
  //   if (auth?.isLoggedIn) {
  //     setIsArcanaOpen(false);
  //   }
  // }, [auth?.isLoggedIn]);

  // useEffect(() => {
  //   console.log('Hello', auth.user, auth.isLoggedIn);
  // }, [auth?.loading]);

  // useEffect(() => {
  //   console.log('Hello', auth.user);
  // }, [auth?.user]);

  // const onLogin = async () => {
  //   console.log(auth.user)
  // };

  useEffect(() => {
    console.log(loadingAuth, 'loadingAuth');
  }, [loadingAuth])

  useEffect(() => {
    console.log(auth?.loading, 'auth.loading');
  }, [auth?.loading])

  useEffect(() => {
    console.log(auth?.isLoggedIn, 'auth.isLoggedIn');
  }, [auth?.isLoggedIn])


  return (
    <>
      {loadingAuth || auth.loading
        ? <CircularProgress size={24} co/>
        : auth?.isLoggedIn
          ? <button
            className="bg-primary text-white text-xl font-medium rounded-full w-[160px] py-[8px] whitespace-normal"
            onClick={async () => {
              await authProvider.init();
              auth.logout();
              router.push('/');
            }}
          >
            Logout
          </button>
          : <button
            className="bg-primary text-white text-xl font-medium rounded-full w-[160px] py-[8px] whitespace-normal"
            onClick={() => router.push('/auth/login')}
          >
            Sign In
          </button>
      }
      {/* {isArcanaOpen ? <>
        <div
          className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center bg-darkGray/40 float-left"
          onClick={() => setIsArcanaOpen(false)}
        >
        </div>
        <div className="mt-16 fixed shadow-4xl">
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
        </div>
      </> : null} */}
    </>
  )
}

export default function Layout({ children }) {
  const auth = useAuth();

  return (
    <div className="bg-white pt-6 relative">
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <div className={`${classes.paddingX} ${classes.flexCenter} mt-8`}>
            <div className={`${classes.boxWidth}`}>{children}</div>
          </div>
        </main>
      </>
      {/* {auth.loading
        ? <Spinner></Spinner>
        : null
      } */}
    </div>
  );
}
