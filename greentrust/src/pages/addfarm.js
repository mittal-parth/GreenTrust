
import { useEffect } from "react";
import InputBox from "@/components/InputBox";
import { useAuth } from "@arcana/auth-react";
import { useState  } from "react";

export default function AddFarm(){


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setFarmDetails({...farmDetails, latitute: position.coords.latitude, longitude: position.coords.longitude});
          });
    }, []);

    const auth = useAuth();
    const [farmDetails , setFarmDetails] = useState({});

    const handleSubmit = async (e) => {
   
        e.preventDefault();
        var details = farmDetails;
        details = JSON.stringify(details);
        if(auth.user){
          var res = await contractCall(auth, "addFarm", [details,1]);
          console.log(res);
        }
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
                label="Size"
                onChange={(e) => setFarmDetails({...farmDetails, size: e.target.value})}
                placeHolder={"Crop name"}
                type={"number"}
              />
              <InputBox
                label="Location"
                onChange={(e) => setFarmDetails({...farmDetails, location: e.target.value})}
                placeHolder={"Address"}
                type={"text"}
              />

               {/* Currently not showing the location but the latitute and longitude get stored on click the button */}
             <div>
              <input
                type="file" multiple
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