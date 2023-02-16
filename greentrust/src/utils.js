import {ethers, BrowserProvider} from 'ethers';

import { CONTRACT_ADDRESS } from '@/config';
import GreenTrustABI from '@/abi/GreenTrust.json';

export const getContract = (auth) => {
    const provider = new ethers.providers.Web3Provider(auth.provider);
    const GreenTrust = new ethers.Contract(CONTRACT_ADDRESS, GreenTrustABI, provider);
    return GreenTrust;
}

export const contractCall = async (auth, func, params = null) => {
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
        const msg = String(e.message).match(/reason="[A-Za-z0-9]+"/g)[0];
        const error = Error(msg);
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

