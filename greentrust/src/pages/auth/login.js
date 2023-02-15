import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";

import { Auth, useAuth } from "@arcana/auth-react";

import { AuthContext } from "@/context/authContext";
import Spinner from "@/components/Spinner";

export default function Login({ children }) {
    const auth = useAuth();

    const { loadingAuth } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (auth?.isLoggedIn) {
            router.push('/');
        }
      }, [auth?.isLoggedIn]);
    
    const onLogin = async () => {
        console.log(auth.user)
    };

    return (
        <>
            {loadingAuth
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
