import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { contractCall } from "@/utils";
import { Auth, useAuth } from "@arcana/auth-react";

import { AuthContext } from "@/context/authContext";
import Spinner from "@/components/Spinner";

export default function Login({ children }) {
    const auth = useAuth();

    const { loadingAuth } = useContext(AuthContext);

    const router = useRouter();

    const checkUser = async () => {
        try{
            const res = await contractCall(auth, "fetchUserType");
            console.log(res.data, "Response");
            if(res.data === "farmer" || res.data === "verifier" || res.data === "consumer"){
                router.push('/dashboard');
            }
        }catch(err){
            console.log("Redirecting to profile page");
            router.push('/profile/role-choice');
        }
    }
    useEffect(() => {
        if (auth?.isLoggedIn) {
            checkUser();
            
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
