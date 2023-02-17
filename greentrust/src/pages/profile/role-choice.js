import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Auth, useAuth } from "@arcana/auth-react";
import { useEffect } from "react";
import NavBar from "@/components/Navbar";
import RoleCard from "@/components/RoleCard";
import Link from 'next/link'


export default function RoleChoice({}) {
  return (
    <>
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center min-h-screen -mt-10">
          <p className="h-32 font-bold text-6xl text-primary font-comfortaa mt-20 md:mt-0 text-left mr-16 md:mr-0">
            Get <br></br>Verified
          </p>
          <div className="flex space-x-[20px] flex-col md:flex-row">
          <Link href={"/farmer/register"}>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center mt-24 lg:mt-36">
          <h2 className="text-6xl">
            Get<br />Verified
          </h2>
          <div className="flex flex-col md:flex-row gap-16">
            <RoleCard name={"Farmer"} imagePath={"/farmer-woman.png"} />
          </Link>
          <Link href={"/verifier/register"}>
            <RoleCard name={"Licensed Inspector"} imagePath={"/sheriff.png"} />
          </Link>
          <Link href={"/farmer"}>
            <RoleCard name={"Guest"} imagePath={"/sheriff.png"} />
          </Link>
          
          </div>
        </div>
      
    </>
  );
}
