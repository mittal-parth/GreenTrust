import InputBox from "@/components/inputBox";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";

export default function Add() {
  const { loading, setLoading } = useContext(LoaderContext);
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
  const [idCards, setIdCards] = useState("Hard Coding 2");
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello Frands");

    if (auth.user) {
      postCrop();
    } else {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Sign in required`,
      });
    }
  };

  const postCrop = async () => {
    setLoading(true);

    console.log("Adding Crop");
    console.log(auth.user);

    try {
      setFarmDetails({ ...farmDetails, documents: "Hard Coding " });

      const res = await contractCall(auth, "addFarm", [
        farmDetails.size,
        farmDetails.name,
        farmDetails.latitute,
        farmDetails.longitude,
        farmDetails.location,
        "Document Id",
      ]);

      console.log(res.data, "Response");

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Added Crop Successfully`,
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

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  return (
    <div>
      <div className="mb-6 font-comfortaa h-screen">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Name"
            onChange={(e) =>
              setFarmDetails({ ...farmDetails, name: e.target.value })
            }
            placeHolder={"Crop name"}
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
              onChange={handleFileChange}
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3"
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
