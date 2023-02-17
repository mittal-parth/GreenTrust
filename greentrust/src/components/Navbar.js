import { useEffect } from "react";

import {ethers} from 'ethers'
import { useAuth } from "@arcana/auth-react";
import * as PushAPI from "@pushprotocol/restapi";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { ArcanaAuth } from './Layout';
import Logo from "./Logo";

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
    console.log(auth.user)
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
    <div className="px-0 md:px-[10%] flex justify-center">
      <nav className="mt-0 md:mt-6 bg-white border-gray-200 px-6 md:px-20 py-3 rounded-none md:rounded-full drop-shadow-2xl w-full max-w-[1400px] flex flex-row items-center justify-between">
        <Logo />
        <div className="flex flex-row gap-4">
          <button>
            <FontAwesomeIcon icon={faBell} className="text-2xl mx-3 text-darkGray" />
          </button>
          <ArcanaAuth />
        </div>
      </nav>
    </div>
  );
}
