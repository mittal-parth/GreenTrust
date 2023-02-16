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
  const [verifierProfile, setVerifierProfile] = useState({});
  const [idCards, setIdCards] = useState("Hard Coded");
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handling Inputs")

    if (auth.user) {
      postVerifierInfo();
    }

    };

  const postVerifierInfo = async () => {

    setLoading(true);
    console.log("Registering verifier");
    console.log(auth.user)  
    const res = await contractCall(auth, "registerVerifier", [
      verifierProfile.name,
      verifierProfile.currentAddress,
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
