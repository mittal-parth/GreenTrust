import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Auth, useAuth } from "@arcana/auth-react";
import { useEffect } from "react";
import NavBar from "@/components/Navbar";
import RoleCard from "@/components/RoleCard";

const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const auth = useAuth();

//   useEffect(() => {
//     if (auth?.isLoggedIn){
//       console.log(auth.user);
//     }
//   }, [auth?.user]);

//   const onLogin = async () => {
//     console.log("Logged in with address: " + auth.provider);
//     const info = await auth.getUser()
//      console.log(auth.getUser());

//   };
//   const logout = async()=>{
//     await auth.logout();
//   }
//   return (
//     <>
//       {auth.loading ? (
//         "Loading"
//       ) : auth.isLoggedIn ? (
//         <div>
//         Logged In
//         <button onClick={logout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
//         </div>
//       )}
//     </>
//   )
// }

export default function Home({}) {
  return (
    <>
      <div className="bg-white w-full overflow-hidden h-screen">
        <NavBar />
        <div className="flex flex-col md:flex-row justify-around items-center min-h-screen -mt-10">
          <p className="h-32 font-bold text-6xl text-primary font-comfortaa mt-20 md:mt-0 text-left mr-16 md:mr-0">
            Get <br></br>Verified
          </p>
          <div className="flex space-x-[20px] flex-col md:flex-row">
            <RoleCard name={"Farmer"} imagePath={"farmer-woman.png"} />
            <RoleCard name={"Licensed Inspector"} imagePath={"sheriff.png"} />
          </div>
        </div>
      </div>
    </>
  );
}
