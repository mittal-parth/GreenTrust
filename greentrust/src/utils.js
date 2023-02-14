import {ethers, BrowserProvider} from 'ethers'
import GreenTrustABI from "@/abi/GreenTrust.json"
import { contractAddress } from "@/config";

export const getContract = (auth) => {
    const provider = new BrowserProvider(auth.provider);
    const GreenTrust = new ethers.Contract(contractAddress, GreenTrustABI, provider);
    return GreenTrust
}

export const contractCall = async (auth, func, params=null) => {
    if (!auth?.isLoggedIn)
        return {
            status: 401,
            error: "Unauthorized"
        }
    const contract = getContract(auth);
    try {
        let data = await eval(`contract.${func}`)(...params)
        return {
            status: 200,
            data: data
        }
    }  catch (e) {
        return {
            status: 500,
            error: e
        }
    }
}