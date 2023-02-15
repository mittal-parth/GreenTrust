import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";

import { Auth, useAuth } from "@arcana/auth-react";

import { AuthLoading } from "@/context/authLoadingContext";

export default function Login({ children }) {
    const auth = useAuth();
    console.log(auth, "test");

    const { authLoading, setAuthLoading } = useContext(AuthLoading);

    console.log(authLoading, "authLoading")

    const router = useRouter();

    useEffect(() => {
        if (auth?.isLoggedIn) {
            alert(authLoading);
            router.push('/');
        }
      }, [auth?.isLoggedIn]);
    
    const onLogin = async () => {
        console.log(auth.user)
    };

    return (
        <>
            {authLoading
                ? <Spinner></Spinner>
                : <div className="bg-white h-screen flex items-center justify-center">
                    <div>
                        <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
                    </div>
                </div>
            }
        </>
    )
}
