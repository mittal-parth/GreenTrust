import {
  Args_enc,
  Args_key,
  Return_keyPair,
  Args_verify
  // Ethereum_Module,
  // Args_setData,
  // Args_getData,
} from "./wrap";

// import { JSON } from "@polywrap/wasm-as";


export function encryptAES(args:Args_enc): string {
  const prkey:u32 = 81369580;
  const pbkey:u32=655;
  const n =prkey*pbkey;
  let encrypted:string [] = args.text.split("")
  let arr1: u32[]= encrypted.map<u32>((c:string):u32 => <u32>(c.charCodeAt(0)))
  let arr2: string[] = arr1.map<string>((m:u32):string => modExp(m, pbkey, n).toString())
  return arr2.join(" ");
}

export function decryptAES(args:Args_enc): string {
  const prkey:u32 = 81369580;
  const pbkey:u32=655
  const n =prkey*pbkey;
  const decrypted:string [] = args.text.split(" ")
  let arr: u32[] = decrypted.map<u32>((m:string):u32 => modExp(U32.parseInt(m), prkey, n))
  let arr2: string[] = arr.map<string>((c:u32):string => String.fromCharCode(c))
  return arr2.join("");
  // return decrypted;
}

export function verify(args:Args_verify):u32{
  let s1:string = args.data1;
  let s2:string = args.data2;

  s2 = s2.substring(1, s2.length - 1);
  //check if substring
  if(s1.includes(s2))
  return 1;
  else return 0;
  //parse into json
  
  // let j1:JSON.Obj = <JSON.Obj>JSON.parse(s1);
  // let j2:JSON.Obj = <JSON.Obj>JSON.parse(s2);
  // const keyArr: string[] = j2.keys;
  // for(let i:i32 = 0; i<keyArr.length;i++){
  //   if(j1.get(keyArr[i])!=j2.get(keyArr[i]))
  //   return 0;
  // }

  //get the keeys
  //remove the first object from j1
 
}

export function modExp(m: u32, e: u32, n: u32): u32 {
  let result:u32 = 1;
  while (e > 0) {
    if (e % 2 === 1) {
      result = (result * m) % n;
    }
    m = (m * m) % n;
    e = <u32> Math.floor(e / 2);
  }
  return result;
}

export function generateKeys(args:Args_key):Return_keyPair {


// function generatePrime(min: u32, max: u32, seed:u32): u32 {

//   function random(seed: u32): f64 {
//     var x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
//   }

//   const isPrime = (num: u32):boolean => {
//     if (num < 2) {
//       return false;
//     }
//     for (let i:u32 = 2; i <= Math.sqrt(num); i++) {
//       if (num % i === 0) {
//         return false;
//       }
//     }
//     return true;
//   };

//   while (true) {
//     const num:f64 = Math.floor(random(seed) * (max - min + 1) + min);
//     let k = num.toString();
//     let l = k.length;
//     k = k.substring(0, l - 2);
//     const num2:u32 = U32.parseInt(k);
//     if (isPrime(num2)) {
//       return num2;
//     }
//   }
// }
    // let minPrime:u32 = 99999;
    // let maxPrime:u32 = 100000;
    const seed:u32 = args.primeseed;
  
    // Generate two large random prime u32s
    const p:u32 = 6271;
    const q:u32 = 12979;
  
    // Calculate the modulus and Euler's totient function
    const n:u32 = p * q;
    const phi:u32 = (p - 1) * (q - 1);
    let e:u32 = 0;
    // Select a public exponent (must be coprime to phi)
    if(seed>10)  e= 65537;
    else e = 14797;
    while (phi % e === 0) {
    }
  
    // Calculate the private exponent (must be the multiplicative inverse of e mod phi)
  
      let t:f64 = 0;
      let newt:f64 = 1;
      let r:f64 = phi;
      let newr:f64 = e;
  
      while (newr !== 0) {
        const quotient:f64 = Math.floor(r / newr);
        t = newt;
        newt = t - quotient * newt;
        r = newr;
        newr = r - quotient * newr;
      }
  
      if (r > 1) {
        throw new Error("e is not invertible");
      }
  
      if (t < 0) {
        t += phi;
      }    

    let ei:string = e.toString();
    let el:u32 = ei.length;
    let ti:string = t.toString();
    let tl:u32 = ti.length;
    ei = ei.substring(0, el - 2);
    ti = ti.substring(0, tl - 2);
  
    const res:Return_keyPair = {
      //convert e from f64 to u32
      publicKey: U32.parseInt(ei),
      privateKey: U32.parseInt(ti),
    };

    return res;
  }

export function encrypt(args: Args_enc): string {
  const text:string = args.text;
  const shift = 3;
  let result:string = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }
  const res:string = result
  return res;
}


export function decrypt(args:Args_enc): string {
  const text:string = args.text;
  const shift = 26-3;
  let result:string = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }
  const res:string = result
  return res;
}



// export function getData(args: Args_getData): u32 {
//   const res = Ethereum_Module.callContractView({
//     address: args.address,
//     method: "function get() view returns (uint256)",
//     args: null,
//     connection: args.connection,
//   }).unwrap();

//   return U32.parseInt(res);
// }


// export function setData(args: Args_setData): string {
//   const res = Ethereum_Module.callContractMethod({
//     address: args.address,
//     method: "function set(uint256 value)",
//     args: [args.value.toString()],
//     connection: args.connection,
//     txOverrides: null,
//   }).unwrap();

//   return res.hash;
// }

