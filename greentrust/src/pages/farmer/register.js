import InputBox from "@/components/inputBox";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";

export default function Register() {
  const { loading, setLoading } = useContext(LoaderContext);
      const router = useRouter();

  useEffect(() => {}, []);

  const auth = useAuth();
  const [farmerProfile, setFarmerProfile] = useState({});
  const [idCards, setIdCards] = useState("Hard Coding 2");
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello Frands")

    setFarmerProfile({ ...farmerProfile, profilePic: "HardCoding 1" });

    var profile = farmerProfile;
    profile = JSON.stringify(profile);
    if (auth.user) {
      postFarmerInfo();
    }
  };

  const postFarmerInfo = async () => {

    setLoading(true);
    console.log("Registering Farmer");
    console.log(auth.user)  
    const res = await contractCall(auth, "registerFarmer", [
      farmerProfile,
      idCards,
    ]);
    if (res.status == 200) {
      console.log(res.data, "Response");
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Registered Successfully`,
      });
      router.replace('/dashboard');
    } else {
      console.log(res);
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Error ${res.status}: Registration failed`,
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
                multiple
                onChange={handleFileChange}
                className="block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white"
              />
            </div>
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
