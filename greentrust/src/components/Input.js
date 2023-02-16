import React, { useState } from "react";

import DropDown from "./DropDown";
import InputBox from "./InputBox";
import { AuthContext } from "@/context/authContext";
import { useAuth } from "@arcana/auth-react";
import { contractCall } from "@/utils";

export default function Input() {
  
  const auth = useAuth();
  

  
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [createdOnDate, setCreatedOnDate] = useState("");
  const [sowedOnDate, setSowedOnDate] = useState("");
  const [cropStatus, setCropStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [latitute, setLatitute] = useState("");
  const [longitude, setLongitude] = useState("");
  const [harvestedOn, setHarvestedOnDate] = useState("");

  const cropStatusList = ["Open", "Locked", "Closed"];

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitute(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }
  const handleSubmit = async (e) => {
   
    e.preventDefault();
   console.log(auth.user);
    var details = {
      name: name,
      size: size,
      createdOnDate: createdOnDate,
      sowedOnDate: sowedOnDate,
      harvestedOn : harvestedOn,
      duration: duration,
    };
    console.log(details); 
    details = JSON.stringify(details);
    if(auth.user){
      contractCall(auth, "addFarm", [details,1]).then((res) => {
        console.log(res);
      });
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
      <div className="mb-6 font-comfortaa">
        <form onSubmit={handleSubmit}>
          <InputBox
            label="Crop Name"
            onChange={(e) => setName(e.target.value)}
            placeHolder={"Crop name"}
            type={"text"}
          />
          <InputBox
            label="Size"
            onChange={(e) => setSize(e.target.value)}
            placeHolder={"Size (acres)"}
            type={"number"}
          />
          <InputBox
            label="Created On"
            onChange={(e) => setCreatedOnDate(e.target.value)}
            placeHolder={"Create On"}
            type={"date"}
          />
          <InputBox
            label="Sowed On"
            onChange={(e) => setSowedOnDate(e.target.value)}
            placeHolder={"Sowed On"}
            type={"date"}
          />
          <InputBox
            label="Harvested On"
            onChange={(e) => setHarvestedOnDate(e.target.value)}
            placeHolder={"Harvested On"}
            type={"date"}
          />
          {/* <DropDown
            optionsList={cropStatusList}
            name={"Crop Status"}
            onClick={(e) =>
              setCropStatus(cropStatusList.indexOf(e.target.value))
            }
            label={"Crop Status"}
          /> */}
          <InputBox
            label="sads "
            onChange={(e) => setDuration(e.target.value)}
            placeHolder={"Duration"}
            type={"number"}
          />
          {/* <div>
            <button
              onClick={getLocation}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3"
              type="submit"
            >
              Get Location
            </button>
          </div> */}

          {/* Currently not showing the location but the latitute and longitude get stored on click the button */}
            {/* <div>
              <input
                type="file" multiple
                onChange={handleFileChange}
                className="block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white"
              />
            </div> */}
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



