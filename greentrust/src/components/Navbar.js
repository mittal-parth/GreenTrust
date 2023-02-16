import { useState } from "react";
import {ethers} from 'ethers'
import { ArcanaAuth } from './Layout';
import { useAuth } from "@arcana/auth-react";
import Logo from "./Logo";
import { useEffect } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navar() {
  const auth = useAuth();

  async function pushSubscribe ()  {
    const provider = new ethers.providers.Web3Provider(auth.provider);
    await PushAPI.channels.subscribe({
      signer: provider,
      channelAddress: 'eip155:5:0xB7E99669e9eDdD2975511FBF059d01969f43D409', // channel address in CAIP
      userAddress: 'eip155:5:' + auth.user.address, // user address in CAIP
      onSuccess: () => {
       console.log('opt in success');
      },
      onError: () => {
        console.error('opt in error');
      },
      env: 'staging'
    })
  }

  useEffect( () => { 
    if (auth.user && auth.user.address) { // 'your connected wallet address'
     pushSubscribe();
      EmbedSDK.init({
        headerText: 'Welcome to GreenTrust', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'GreenTrust', // mandatory
        user: auth.user.address, // mandatory
        chainId: 5, // mandatory
        viewOptions: {
            type: 'sidebar', // optional [default: 'sidebar', 'modal']
            showUnreadIndicator: true, // optional
            unreadIndicatorColor: '#cc1919',
            unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'dark',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        }
        
   
      });
    }
      return () => {
        EmbedSDK.cleanup();
      };
    },[]);

  return (
    <div>
      <nav className="hidden bg-white border-gray-200 px-[80px] py-[12px] rounded-full drop-shadow-2xl w-full max-w-[1400px] md:flex flex-row items-center justify-between mx-auto">
        <Logo />
        <div className="flex flex-row ">
          {/* <div>
            <div class="flex items-center pointer-events-none">
            <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
            ></path>
            </svg>
      <nav className="hidden md:block bg-white border-gray-200 px-2 px-4 py-2.5 rounded-full shadow-xl mx-[13%] mt-[1.566rem] h-[88px]">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div>
            <a>
              <div className="flex flex-col items-center gap-[0px] pl-10  font-comfortaa">
                <b className="text-primary text-[24px]">GREEN</b>
                <b className="text-black tracking-[.25em]">TRUST</b>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <div className="relative w-full pr-[40px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border-2 border-black-300 text-gray-900 text-md rounded-full w-[311px] pl-10 p-2.5"
                placeholder="Search"
                required
              ></input>
            </div>
            <div className="flex flex-row items-center gap-[20px]">
              <button className="bg-primary text-white text-md rounded-full px-4 py-2.5 w-[156px] h-[44px]">
                Sign In
              </button>
            </div>
            <input
            type="text"
            id="simple-search"
            class="bg-white border-2 border-black-300 text-gray-900 text-md rounded-full w-[311px] pl-10 p-2.5"
            placeholder="Search"
            required
            ></input>
          </div> */}
          <button  id="sdk-trigger-id">
            <FontAwesomeIcon icon={faBell} className="text-2xl mx-3" color="gray" />
          </button>
          <ArcanaAuth />
        </div>
      </nav>

        
      {/* For mobile devices only */}
      <nav className="md:hidden flex justify-between bg-white border-gray-200 px-2 md:px-4 py-2.5 shadow-xl m-auto w-full h-[64px]">
        <div>
          <div>
            <a>
              <div className="flex flex-col items-center gap-[0px] pl-10">
                <b className="text-primary text-[24px]">GREEN</b>
                <b className="text-black tracking-[.25em]">TRUST</b>
              </div>
            </a>
          </div>
        </div>
        <svg
          width="98"
          height="44"
          viewBox="0 0 98 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="22" fill="white" />
          <path
            d="M29 27V21.8C28.5 21.9 28 22 27.5 22H27V28H17V21C17 18.2 19.2 16 22 16C22.1 14.7 22.7 13.6 23.5 12.7C23.2 12.3 22.6 12 22 12C20.9 12 20 12.9 20 14V14.3C17 15.2 15 17.9 15 21V27L13 29V30H31V29L29 27ZM20 31C20 32.1 20.9 33 22 33C23.1 33 24 32.1 24 31H20ZM31 16.5C31 18.4 29.4 20 27.5 20C25.6 20 24 18.4 24 16.5C24 14.6 25.6 13 27.5 13C29.4 13 31 14.6 31 16.5Z"
            fill="#454955"
          />
          <rect x="54" width="44" height="44" rx="22" fill="#72B01D" />
          <path
            d="M76 15.25C76.5563 15.25 77.1 15.415 77.5625 15.724C78.0251 16.033 78.3855 16.4723 78.5984 16.9862C78.8113 17.5001 78.867 18.0656 78.7585 18.6112C78.6499 19.1568 78.3821 19.6579 77.9887 20.0512C77.5954 20.4446 77.0943 20.7124 76.5487 20.821C76.0031 20.9295 75.4376 20.8738 74.9237 20.6609C74.4098 20.448 73.9705 20.0876 73.6615 19.625C73.3525 19.1625 73.1875 18.6188 73.1875 18.0625C73.1875 17.3166 73.4838 16.6012 74.0113 16.0738C74.5387 15.5463 75.2541 15.25 76 15.25ZM76 14.125C75.2212 14.125 74.46 14.3559 73.8124 14.7886C73.1649 15.2212 72.6602 15.8362 72.3622 16.5557C72.0642 17.2752 71.9862 18.0669 72.1382 18.8307C72.2901 19.5945 72.6651 20.2961 73.2158 20.8467C73.7664 21.3974 74.468 21.7724 75.2318 21.9243C75.9956 22.0763 76.7873 21.9983 77.5068 21.7003C78.2263 21.4023 78.8413 20.8976 79.2739 20.2501C79.7066 19.6025 79.9375 18.8413 79.9375 18.0625C79.9375 17.0182 79.5227 16.0167 78.7842 15.2783C78.0458 14.5398 77.0443 14.125 76 14.125ZM81.625 29.875H80.5V27.0625C80.5 26.6932 80.4273 26.3274 80.2859 25.9862C80.1446 25.645 79.9374 25.3349 79.6762 25.0738C79.4151 24.8126 79.105 24.6054 78.7638 24.4641C78.4226 24.3227 78.0568 24.25 77.6875 24.25H74.3125C73.5666 24.25 72.8512 24.5463 72.3238 25.0738C71.7963 25.6012 71.5 26.3166 71.5 27.0625V29.875H70.375V27.0625C70.375 26.0182 70.7898 25.0167 71.5283 24.2783C72.2667 23.5398 73.2682 23.125 74.3125 23.125H77.6875C78.7318 23.125 79.7333 23.5398 80.4717 24.2783C81.2102 25.0167 81.625 26.0182 81.625 27.0625V29.875Z"
            fill="white"
          />
        </svg>
      </nav>

    </div>
  );
}
