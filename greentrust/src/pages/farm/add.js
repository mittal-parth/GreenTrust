import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { useAuth } from "@/auth/useAuth";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";
import Form from "@/components/Form";
import FormPage from "@/components/FormPage";
import farmer from '@/../../public/lotties/farmer.json';


export default function Add() {
  const [loading, setLoading] = useState(true);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      setLoading(false);
    }
  }, [auth.user])

  useEffect(() => {
    if (!auth.user) {
      setLoading(true);
    }
  }, [])


  const [farmDetails, setFarmDetails] = useState({});
  const [proofs, setProofs] = useState([]);
  const [farmImage, setFarmImage] = useState([]);

  const handleSubmit = async (imageHash, proofsHash) => {
    proofsHash = JSON.parse(proofsHash)
    proofsHash.farmImage = imageHash;
    proofsHash = JSON.stringify(proofsHash);

    await contractCall(auth, "addFarm", [
      farmDetails.size,
      farmDetails.name,
      String(farmDetails.latitute),
      String(farmDetails.longitude),
      farmDetails.location,
      proofsHash,
    ]);

    router.replace("/dashboard");
  }

  return (
    <FormPage
      form={<Form
        handleSubmit={handleSubmit}
        fields={[
          {
            label: 'Name',
            placeholder: `Jane's Farm`,
          },
          {
            label: 'Size (in acres)',
            dataLabel: 'size',
            type: 'number'
          },
          {
            label: 'Location',
            placeholder: '1234 Main St'
          },
          {
            label: 'Latitude',
            placeholder: 'xx.xx',
            type: 'number'
          },
          {
            label: 'Longitude',
            placeholder: 'xx.xx',
            type: 'number'
          },
          {
            label: 'Farm Image',
            isFile: true,
            isMultiple: false,
            setFile: setFarmImage,
            file: farmImage,
          },
          {
            label: 'Document Proofs',
            isFile: true,
            isMultiple: true,
            setFile: setProofs,
            file: proofs,
          }
        ]}
        setData={setFarmDetails}
        data={farmDetails}
      />}
      title="Setup your farm"
      text="Provide the details asked in the form."
      image={farmer}
    />
  );
}
