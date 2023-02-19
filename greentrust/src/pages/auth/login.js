import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@/auth/useAuth";

import Spinner from "@/components/Spinner";

export default function Login({ children }) {
  const auth = useAuth();

  const router = useRouter();

  const checkUser = async () => {
    try {
      const res = await contractCall(auth, "fetchUserType");
      console.log(res.data, "Response");
      if (res.data === "farmer" || res.data === "verifier") {
        router.push("/dashboard");
      } else {
        router.push("/farms");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!auth?.loading && !auth?.isLoggedIn) {
      onLogin();
    } else if (!auth?.loading && auth?.isLoggedIn) {
      checkUser();
    }
  }, [auth?.loading, auth?.isLoggedIn]);

  const onLogin = async () => {
    try {
      await auth.connect();
      console.log("test", auth.user)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {auth.loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="bg-white h-screen flex items-center justify-center">
          <div></div>
        </div>
      )}
    </>
  );
}
