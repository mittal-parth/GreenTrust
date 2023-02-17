import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { useAuth } from "@arcana/auth-react";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";
import Form from "@/components/Form";
import FormPage from "@/components/FormPage";


export default function Add() {
  const { loading, setLoading } = useContext(LoaderContext);
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
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    if (proofs.length == 0) {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Please upload a valid proof of ownership",
      });
      return;
    }
    const fileHashes = await uploadFile(proofs.length == 1 ? [proofs] : Object.values(proofs));
    var docHashes = ''
    fileHashes.forEach((fH) => {
      docHashes += fH[0].hash + ' '
    });

    postFarm(docHashes);
  };

  const postFarm = async (docHashes) => {
    console.log('debug: ', farmDetails, docHashes);

    try {
      await contractCall(auth, "addFarm", [
        farmDetails.size,
        farmDetails.name,
        String(farmDetails.latitute),
        String(farmDetails.longitude),
        farmDetails.location,
        docHashes,
      ]);

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Success`,
        severity: "success",
      });

      router.replace("/dashboard");
    } catch (err) {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Error ${err.code}: ${err.message}`,
      });
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
            label: 'Document Proofs',
            isFile: true,
            isMultiple: true,
            setFile: setProofs,
          }
        ]}
        setData={setFarmDetails}
        data={farmDetails}
      />}
      title="Setup your farm"
      text="Provide the details asked in the form."
      image="/farmer-woman.png"
    />
  );
}
