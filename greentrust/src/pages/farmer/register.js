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
  const [farmerProfile, setFarmerProfile] = useState({});
  const [profilePic, setProfilePic] = useState();
  const [ids, setIds] = useState([]);
  // const [idCards, setIdCards] = useState("");
  const {snackbarInfo, setSnackbarInfo} = useContext(SnackbarContext);
  // var fileHash = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    var profile = farmerProfile;

    console.log(profilePic, "THESE ARE THE PROFILE PIC")
    console.log(ids, "THESE ARE THE IDS")
    
    // Hashing Profile Pic
    if(profilePic){
      await uploadFile([profilePic]).then((res) => {
        console.log(res[0]);
      farmerProfile["profilePic"] = res[0][0].hash;
      profile = JSON.stringify(farmerProfile);
      console.log(profile, "THIS IS THE PROFILE Updated");
    });
    }

    // Hashing ID Cards
    if(ids.length == 0){
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Please upload your ID card`,
      });
      return;
    }
    console.log(ids.length == 1 ? [ids] : Object.values(ids))
    const fileHashes = await uploadFile(ids.length == 1 ? [ids] : Object.values(ids) );
    console.log(fileHashes, "THESE ARE THE FILE HASHES")
    var idCardsHash =""
    fileHashes.forEach((fH) =>{
      idCardsHash += fH[0].hash + " "
    });
    console.log(idCardsHash)
  

    // profile = JSON.stringify({ ...farmerProfile, profilePic: fileHash });

    console.log(profile," This is the profile");

    if (auth.user) {
      postFarmerInfo(profile , idCardsHash);
    }
  };

  const postFarmerInfo = async (profile, idCardsHash) => {
    setLoading(true);

    try {
      const res = await contractCall(auth, "registerFarmer", [
        profile,
        idCardsHash,
      ]);
      
      router.replace('/dashboard');
    }
    catch (err) {
      console.log(err);
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Registered failed`,
      });
    }
    
    setLoading(false);
  };

  const [file, setFile] = useState("");




  return (
    <div>
      <div className="mb-6 font-comfortaa h-screen">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Name"
            onChange={(e) =>
              setFarmerProfile({ ...farmerProfile, name: e.target.value })
            }
            placeHolder={"Name"}
            type={"text"}
          />
          <InputBox
            label="Email"
            onChange={(e) =>
              setFarmerProfile({ ...farmerProfile, email: e.target.value })
            }
            placeHolder={"Email"}
            type={"email"}
          />
          <InputBox
            label="Address"
            onChange={(e) =>
              setFarmerProfile({
                ...farmerProfile,
                currentAddress: e.target.value,
              })
            }
            placeHolder={"Address"}
            type={"text"}
          />
          <InputBox
            label="Farmer Id"
            onChange={(e) =>
              setFarmerProfile({ ...farmerProfile, farmerId: e.target.value })
            }
            placeHolder={"Farmer Id"}
            type={"text"}
          />
          <InputBox
            label="Govt Id"
            onChange={(e) =>
              setFarmerProfile({ ...farmerProfile, govtId: e.target.value })
            }
            placeHolder={"Govt Id"}
            type={"text"}
          />
          
          <div className="mb-10">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1"
              htmlFor="grid-first-name"
            >
              Profile Pic
            </label>
            <div>
              <input
                type="file"
                onChange={e=>{setProfilePic(e.target.files[0])}}
                className="block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white"
                />
            </div>
          </div>

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
                onChange={e=>{setIds(e.target.files)}}
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
