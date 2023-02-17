import {ethers, BrowserProvider} from 'ethers';
import IpfsHttpClientLite from 'ipfs-http-client-lite';
import { CONTRACT_ADDRESS } from '@/config';
import GreenTrustABI from '@/abi/GreenTrust.json';

export const uploadFile = async (files) => {
const projectId = '2Ln8ZP0EreH0IInN40eJm52wZa7';
const projectSecret = 'ffc9d27761543211de14432fee351c80';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = IpfsHttpClientLite({
    apiUrl: "https://ipfs.infura.io:5001",
    headers: {
      Authorization: auth,
      
    }
  })
  console.log(ipfs)
  const res =[];
  for (const file of files) {
    const fileRes = await ipfs.add(file);
    console.log(fileRes)
    res.push(fileRes);
  }

return res;
}

export const getFile = (hash) => {
const projectId = '2Ln8ZP0EreH0IInN40eJm52wZa7';
const projectSecret = 'ffc9d27761543211de14432fee351c80';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const client = new IpfsHttpClientLite();

const ipfs = IpfsHttpClientLite({
    apiUrl: "https://ipfs.infura.io:5001",
    headers: {
      Authorization: auth,
      
    }
  })
const res = ipfs.cat(hash);
return res;

}

export const getContract = (auth) => {
    const provider = new ethers.providers.Web3Provider(auth.provider);
    const signer = provider.getSigner()
    const GreenTrust = new ethers.Contract(CONTRACT_ADDRESS, GreenTrustABI, signer);
    return GreenTrust;
}

export const contractCall = async (auth, func, params = []) => {
    if (!auth?.isLoggedIn) {
        const error = Error("Unauthorized");
        error.code = 401;
        throw error;
    }
    
    const contract = getContract(auth);
    
    try {
        let data = await eval(`contract.${func}`)(...params);
        return {
            status: 200,
            data: data,
        };
    } catch (e) {
        console.log('contractCall debug:', e);
        const error = Error("Something went wrong");
        error.code = 500;
        throw error;
    }
};

export const sendNotification = async (signer, title, body, recipients) => {
    // apiResponse?.status === 204, if sent successfully!
    // apiResponse?.status === 204, if sent successfully!
    recipients = recipients.map((r) => `eip155:5:${r}`);
    const apiResponse = await PushAPI.payloads.sendNotification({
        //append 'eip155:5:' to every member of recipient array

        signer,
        type: 4, // subset
        identityType: 2, // direct payload
        notification: {
            title: title,
            body: body,
        },
        payload: {
            title: ``,
            body: ``,
            cta: '',
            img: ''
        },
        recipients: recipients, // recipients addresses
        channel: 'eip155:5:0xB7E99669e9eDdD2975511FBF059d01969f43D409', // your channel address
        env: 'staging'
    });
};

export const sendNotificationAll = async (signer, title, body) => {
    // apiResponse?.status === 204, if sent successfully!
    const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
            title: title,
            body: body
        },
        payload: {
            title: ``,
            body: ``,
            cta: '',
            img: ''
        },
        channel: 'eip155:5:0xB7E99669e9eDdD2975511FBF059d01969f43D409', // your channel address
        env: 'staging'
    });
}

