import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { useAuth } from '@/auth/useAuth';

import { CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Navbar from "./Navbar";
import classes from "../style";
import Spinner from "./Spinner";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";


export function ArcanaAuth() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.loading && !auth?.isLoggedIn) {
      router.push('/auth/login');
    }
  }, [auth?.loading, auth?.isLoggedIn])

  return (
    <>
      {auth.loading
        ? <CircularProgress size={24} co />
        : auth?.isLoggedIn
          ? <button
            className="bg-primary text-white text-xl font-medium rounded-full w-[160px] py-[8px] whitespace-normal"
            onClick={async () => {
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
      <div className="bg-white relative min-h-[100vh]">
        <SnackbarContext.Provider value={{snackbarInfo, setSnackbarInfo}}>
          <header>
            <Navbar />
          </header>
          {(auth.loading || loading) && <Spinner></Spinner>}
          <LoaderContext.Provider value={{ loading, setLoading }}>
            <main className="h-full flex justify-center px-6 md:px-[12%] mb-24 overflow-x-clip">
              <div className="mt-16 h-full max-w-[1300px] w-full">
                {children}
              </div>
            </main>
          </LoaderContext.Provider>
        </SnackbarContext.Provider>
      </div>
    </>
  );
}
