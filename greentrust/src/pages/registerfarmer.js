
import { useEffect } from "react";
import { useAuth } from "@arcana/auth-react";
import { useState } from "react";

import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import DropZone from "@/components/DropZone";

export default function AddFarm() {


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setFarmDetails({ ...farmDetails, latitute: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  const auth = useAuth();
  const [farmDetails, setFarmDetails] = useState({});

  const handleSubmit = async (e) => {

    e.preventDefault();
    var details = farmDetails;
    details = JSON.stringify(details);
    if (auth.user) {
      var res = await contractCall(auth, "addFarm", [details, 1]);
      console.log(res);
    }
  };

  const [files, setFiles] = useState([]);

  return (
    <div>
      <div className="mb-6 font-comfortaa h-screen">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Name"
            onChange={(e) => setFarmDetails({ ...farmDetails, size: e.target.value })}
            placeHolder={"Name"}
            type={"text"}
          />
          <InputBox
            label="Email"
            onChange={(e) => setFarmDetails({ ...farmDetails, size: e.target.value })}
            placeHolder={"Email"}
            type={"email"}
          />
          <InputBox
            label="Address"
            onChange={(e) => setFarmDetails({ ...farmDetails, location: e.target.value })}
            placeHolder={"Address"}
            type={"text"}
          />

          <DropZone label="Proofs" setFiles={setFiles} />

          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
}
