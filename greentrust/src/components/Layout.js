import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { useAuth } from '@/auth/useAuth';

import { CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Modal from './Modal';
import AccountCard from './AccountCard';


export function ArcanaAuth() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.loading && !auth?.isLoggedIn) {
      router.push('/');
    }
  }, [auth?.loading, auth?.isLoggedIn])

  return (
    <>
      {auth.loading
        ? <Skeleton variant="circular" width={44} height={44} />
        : <Modal
          anchor={<div className="w-[44px] h-[44px] bg-primary rounded-full shadow-sm hover:scale-105 flex items-center justify-center"><FontAwesomeIcon
            icon={faUser}
            className="text-white"
          /></div>}
          popover={<AccountCard auth={auth} />}
        />
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
    setSnackbarInfo({ ...snackbarInfo, open: false });
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
        <SnackbarContext.Provider value={{ snackbarInfo, setSnackbarInfo }}>
          <header>
            <Navbar />
          </header>
          <LoaderContext.Provider value={{ loading, setLoading }}>
            {(auth.loading || loading) && <Spinner></Spinner>}
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
