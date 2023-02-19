import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "@/auth/useAuth";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import FormPage from "@/components/FormPage";
import Form from "@/components/Form";
import plant from '@/../../public/lotties/plant.json';


export default function Add() {
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const router = useRouter();

  const { farmId, cropId } = router.query;

  const auth = useAuth();

  const [data, setData] = useState({})

  const handleSubmit = async (e) => {
    const details = JSON.stringify({
      name: data.name,
      sowedOn: Math.floor(new Date(data.sowedOn).getTime() / 1000),
      duration: data.duration,
      size: data.size
    });

    const res = await contractCall(auth, "addCrop", [
      details,
      0,
      farmId,
      data.stakeAmount
    ]);

    router.push('/farm/' + farmId);
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
      image={plant}
    />
  );
}
