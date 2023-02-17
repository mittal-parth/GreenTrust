import InputBox from "@/components/InputBox";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";

export default function Register() {
  const { loading, setLoading } = useContext(LoaderContext);
  const router = useRouter();

  useEffect(() => {}, []);

  const auth = useAuth();
  const [verifierProfile, setVerifierProfile] = useState({});
  const [ids, setIds] = useState([]);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(ids.length == 0){
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Please upload your ID card`,
      });
      return;
    }
    const fileHashes = await uploadFile(ids.length == 1 ? [ids] : Object.values(ids) );
    console.log(fileHashes, "THESE ARE THE FILE HASHES")
    var idCardsHash =""
    fileHashes.forEach((fH) =>{
      idCardsHash += fH[0].hash + " "
    });
    console.log(idCardsHash)
    console.log(auth.user)
    if (auth.user) {
      postVerifierInfo(idCardsHash);
    }

    };

  const postVerifierInfo = async (idCardsHash) => {

    setLoading(true);

    console.log(auth.user)  

    try{
      const res = await contractCall(auth, "registerVerifier", [
        verifierProfile.name,
        verifierProfile.currentAddress,
        idCardsHash,
      ]);
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Registered Successfully`,
      });
      router.replace('/dashboard');

    }catch(err){
      
      console.log(err)
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Registration failed`,
        });
      
    }
    setLoading(false);
  };


  return (
    <div>
      <div className="mb-6 font-comfortaa h-screen">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Name"
            onChange={(e) =>
              setVerifierProfile({ ...verifierProfile, name: e.target.value })
            }
            placeHolder={"Name"}
            type={"text"}
          />
          <InputBox
            label="Address"
            onChange={(e) =>
              setVerifierProfile({
                ...verifierProfile,
                currentAddress: e.target.value,
              })
            }
            placeHolder={"Address"}
            type={"text"}
          />
          <div className="mb-10">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1"
              htmlFor="grid-first-name"
              >
              Id Card
            </label>
            <div>
              <input
                type="file"
                multiple
                onChange={e=>{setIds(e.target.files);}}
                className="block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white"
              />
            </div>
          </div>
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white bg-black font-bold py-2 px-4 rounded mb-3"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
