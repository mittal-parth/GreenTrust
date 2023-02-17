import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { useAuth } from "@arcana/auth-react";

import InputBox from "@/components/InputBox";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import FormPage from "@/components/FormPage";
import Form from "@/components/Form";


export default function Add() {
  const { loading, setLoading } = useContext(LoaderContext);
  const router = useRouter();
  const { farmId, cropId } = router.query;

  useEffect(() => { }, []);

  const auth = useAuth();
  const [cropDetails, setCropDetails] = useState({})
  const [harvestedOn, setHarvestedOn] = useState(0)
  const [stakeAmount, setStakeAmount] = useState(0)
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const [data, setData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello Frands")


    var details = cropDetails;
    details = JSON.stringify(details);
    if (auth.user) {
      postCrop(details);
    } else {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Sign in required`,
      });
    }
  };

  const dateToUnix = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
  };
  const postCrop = async (details) => {

    setLoading(true);

    console.log("Adding Crop");
    console.log(auth.user)

    try {
      console.log()
      const res = await contractCall(auth, "addCrop", [
        details,
        harvestedOn,
        farmId,
        stakeAmount
      ]);

      console.log(res.data, "Response");

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Added Crop Successfully`,
        severity: "success"
      });

      router.replace('/farm/' + farmId);

    } catch (err) {

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
    <FormPage
      form={<Form
        handleSubmit={handleSubmit}
        fields={[
          {
            label: 'Name',
            placeholder: 'Tomato',
          },
          {
            label: 'Sowed On',
            type: 'date',
            dataLabel: 'sowedOn'
          },
          {
            label: 'Stake amount (in Wei)',
            type: 'number',
          },
          {
            label: 'Duration (in months)',
            type: 'number',
            dataLabel: 'duration'
          },
          {
            label: 'Size (in acres)',
            type: 'number',
            dataLabel: 'size'
          },
        ]}
        setData={setData}
        data={data}
      />}
      title="Add a crop"
      text="Provide the details asked in the form."
      image="/images/plant.png"
    />
  );
}
