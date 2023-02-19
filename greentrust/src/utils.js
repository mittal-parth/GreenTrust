import { ethers, BrowserProvider } from "ethers";
import IpfsHttpClientLite from "ipfs-http-client-lite";
import { CONTRACT_ADDRESS, PUSH } from "@/config";
import GreenTrustABI from "@/abi/GreenTrust.json";
import * as PushAPI from "@pushprotocol/restapi";

export const uploadFile = async (files) => {
  const projectId = "2Ln8ZP0EreH0IInN40eJm52wZa7";
  const projectSecret = "ffc9d27761543211de14432fee351c80";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = IpfsHttpClientLite({
    apiUrl: "https://ipfs.infura.io:5001",
    headers: {
      Authorization: auth,
    },
  });
  console.log(ipfs);
  const res = [];
  for (const file of files) {
    const fileRes = await ipfs.add(file);
    console.log(fileRes);
    res.push(fileRes);
  }

  return res;
};

export const getFile = (hash) => {
  const projectId = "2Ln8ZP0EreH0IInN40eJm52wZa7";
  const projectSecret = "ffc9d27761543211de14432fee351c80";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  // const client = new IpfsHttpClientLite();

  const ipfs = IpfsHttpClientLite({
    apiUrl: "https://ipfs.infura.io:5001",
    headers: {
      Authorization: auth,
    },
  });
  const res = ipfs.cat(hash);
  return res;
};

export const getContract = (auth) => {
  const provider = new ethers.providers.Web3Provider(auth.provider);
  const signer = provider.getSigner();
  const GreenTrust = new ethers.Contract(
    CONTRACT_ADDRESS,
    GreenTrustABI,
    signer
  );
  return GreenTrust;
};

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
    console.log("contractCall debug:", e);
    const error = Error("Something went wrong");
    error.code = 500;
    throw error;
  }
};

export const sendNotification = async (title, body) => {
  try {
    console.log(process.env.PUSH);
    const PK = PUSH;
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1, // broadcast
      identityType: 0, // Minimal payload
      notification: {
        title: title,
        body: body,
      },
      payload: {
        title: title,
        body: body,
        cta: "",
        img: "",
      },
      channel: "eip155:5:0x384B24d2B78020e467b5e1f70f1b351078eb34dC", // your channel address
      env: "staging",
    });
    console.log(apiResponse);
  } catch (e) {
    console.log(e);
  }
};

export const sendNotificationAll = async (signer, title, body) => {
  // apiResponse?.status === 204, if sent successfully!
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 1, // broadcast
    identityType: 2, // direct payload
    notification: {
      title: title,
      body: body,
    },
    payload: {
      title: ``,
      body: ``,
      cta: "",
      img: "",
    },
    channel: "eip155:5:0xB7E99669e9eDdD2975511FBF059d01969f43D409", // your channel address
    env: "staging",
  });
};

export const getChallengeStatusCode = (status) => {
  const map = {
    OPEN: 0,
    ALLOTED: 1,
    REJECTED: 2,
    SUCCESSFUL: 3,
  };
  return map[status];
};

export const getChallengeStatus = (code) => {
  const map = {
    0: "OPEN",
    1: "ALLOTED",
    2: "REJECTED",
    3: "SUCCESSFUL",
  };
  return map[code];
};

export const getStatusColor = (code) => {
  const map = {
    0: "border-yellow",
    1: "border-blue",
    2: "border-red",
    3: "border-primary",
  };
  return map[code];
};

export const CAROUSEL_RESPONSIVE_SETTINGS = {
  lg: {
    breakpoint: { max: 3000, min: 1500 },
    items: 4,
  },
  md: {
    breakpoint: { max: 1500, min: 1200 },
    items: 3,
  },
  sm: {
    breakpoint: { max: 1200, min: 720 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
  }
}