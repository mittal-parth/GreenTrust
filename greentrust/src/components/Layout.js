import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useState } from "react";
import { useContext } from "react";

import { Auth, useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Navbar from "./Navbar";
import classes from "../style";
import Spinner from "./Spinner";
import { AuthContext } from "@/context/authContext";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";


export function ArcanaAuth() {
  const router = useRouter();
  const auth = useAuth();

  const { loadingAuth, authProvider } = useContext(AuthContext);

  useEffect(() => {
    console.log('user debug:', auth?.user);
  }, [auth?.isLoggedIn])

  return (
    <>
      {loadingAuth || auth.loading
        ? <CircularProgress size={24} co />
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
    </>
  )
}

export default function Layout({ children }) {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    severity: "error",
    message: ""
  });

  const handleClose = () => {
    setSnackbarInfo({...snackbarInfo, open: false});
  };

  return (
    <>
      <Snackbar
        open={snackbarInfo.open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity={snackbarInfo.severity}>
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
      <div className="bg-white pt-6 relative min-h-[100vh]">
        <SnackbarContext.Provider value={{snackbarInfo, setSnackbarInfo}}>
          <header>
            <Navbar />
          </header>
          {loading && <Spinner></Spinner>}
          <LoaderContext.Provider value={{ loading, setLoading }}>

            <main>
              <div className={`${classes.paddingX} ${classes.flexCenter} mt-8`}>
                <div className={`${classes.boxWidth}`}>{children}</div>
              </div>
            </main>
          </LoaderContext.Provider>
        </SnackbarContext.Provider>
      </div>
    </>
  );
}
