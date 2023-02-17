import InputBox from "@/components/InputBox";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext, LoaderContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";

export default function Add() {
  const router = useRouter();
  const { farmId, cropId } = router.query;
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setFarmDetails({
        ...farmDetails,
        latitute: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  
  const auth = useAuth();
  const [farmDetails, setFarmDetails] = useState({});
  const [ids, setIds] = useState([]);
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello Frands");

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


    if (auth.user) {
      postFarm(idCardsHash);
    } else {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Sign in required`,
      });
    }
  };

  const postFarm = async (idCardsHash) => {
    setLoading(true);

    console.log("Adding Farm");
    console.log(auth.user);

    try {

      const res = await contractCall(auth, "addFarm", [
        farmDetails.size,
        farmDetails.name,
        farmDetails.latitute,
        farmDetails.longitude,
        farmDetails.location,
        idCardsHash,
      ]);

      console.log(res.data, "Response");

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Added Farm Successfully`,
        severity: "success",
      });

      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Error ${err.code}: ${err.message}`,
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
              setFarmDetails({ ...farmDetails, name: e.target.value })
            }
            placeHolder={"Farm name"}
            type={"text"}
          />
          <InputBox
            label="Size"
            onChange={(e) =>
              setFarmDetails({ ...farmDetails, size: e.target.value })
            }
            placeHolder={"Size (Acres)"}
            type={"number"}
          />
          <InputBox
            label="Location"
            onChange={(e) =>
              setFarmDetails({ ...farmDetails, location: e.target.value })
            }
            placeHolder={"Address"}
            type={"text"}
          />

          {/* Currently not showing the location but the latitute and longitude get stored on click the button */}
          <div>
            <input
              type="file"
              multiple
              onChange={e=>{setIds(e.target.files)}}
              className="block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white"
            />
          </div>
          <div className="flex space-x-3 my-5">
            <p className="text-red-500 text-xs italic font-comfortaa">
              Latitude : {farmDetails.latitute}
            </p>
            <p className="text-red-500 text-xs italic font-comfortaa">
              Longitude : {farmDetails.longitude}
            </p>
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
