import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { useAuth } from "@arcana/auth-react";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import FormPage from "@/components/FormPage";
import Form from "@/components/Form";


export default function Add() {
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  
  const router = useRouter();

  const { farmId, cropId } = router.query;

  const auth = useAuth();
  
  const [data, setData] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const details = JSON.stringify({
      name: data.name,
      sowedOn: data.sowedOn,
      duration: data.duration,
      size: data.size
    });

    console.log('debug:', details, farmId, data.stakeAmount);

    if (auth.user) {
      postCrop(details);
    } else {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Sign-in required`,
      });
    }
  };

  const postCrop = async (details) => {
    try {
      const res = await contractCall(auth, "addCrop", [
        details,
        0,
        farmId,
        data.stakeAmount
      ]);

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Success",
        severity: "success"
      });

      router.replace('/farm/' + farmId);
    } catch (err) {
      setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
    }

    setLoading(false);
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
            dataLabel: 'stakeAmount'
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
