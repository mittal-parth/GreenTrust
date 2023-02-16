import InputBox from "@/components/InputBox";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@arcana/auth-react";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";

export default function Add () {
  const { loading, setLoading } = useContext(LoaderContext);
  const router = useRouter();
  const { farmId, cropId } = router.query;

  useEffect(() => {}, []);

  const auth = useAuth();
  const [cropDetails, setCropDetails] = useState({});
  const [idCards, setIdCards] = useState("Hard Coding 2");
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello Frands")


    var details = cropDetails;
    details = JSON.stringify(details);
    if (auth.user) {
      postCrop();
    }else{
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
    console.log(auth.user)  
    
    try{

        const res = await contractCall(auth, "addCrop", [
          cropDetails,
          farmId,
        ]);
          
        console.log(res.data, "Response");
        
        setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Added Crop Successfully`,
        });
        
        router.replace('/dashboard');
        
    }catch(err){
        
        console.log(err);
        setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
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
      <div className="mb-6 font-comfortaa">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Crop Name"
            onChange={(e) => setCropDetails({ ...cropDetails, name: e.target.value })}
            placeHolder={"Crop name"}
            type={"text"}
          />
          <InputBox
            label="Created On"
            onChange={(e) => setCropDetails({ ...cropDetails, createdOn: e.target.value })}
            placeHolder={"Created On"}
            type={"date"}
          />
          <InputBox
            label="Sowed On"
            onChange={(e) =>setCropDetails({ ...cropDetails, sowedOn: e.target.value }) }
            placeHolder={"Sowed On"}
            type={"date"}
          />
          <InputBox
            label="Harvested On"
            onChange={(e) => setCropDetails({ ...cropDetails, harvestedOn: e.target.value })}
            placeHolder={"Harvested On"}
            type={"date"}
          />
          <InputBox
            label="Stake Amount"
            onChange={(e) => setCropDetails({ ...cropDetails, stakeAmount: e.target.value })}
            placeHolder={"Stake Amount"}
            type={"number"}
          />
          <InputBox
            label="Duration"
            onChange={(e) => setCropDetails({ ...cropDetails, duration: e.target.value })}
            placeHolder={"Duration"}
            type={"number"}
          />
          <InputBox
            label="Size"
            onChange={(e) => setCropDetails({ ...cropDetails, size: e.target.value })}
            placeHolder={"Size (Acres)"}
            type={"number"}
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
