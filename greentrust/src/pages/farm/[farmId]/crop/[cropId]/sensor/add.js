import { useRouter } from "next/router";
import { useState, useContext } from "react";

import { useAuth } from "@arcana/auth-react";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import FormPage from "@/components/FormPage";
import Form from "@/components/Form";


export default function AddSensor() {
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  
  const router = useRouter();
  const { farmId, cropId } = router.query;

  const auth = useAuth();

  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (data.name == "") {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Please enter a name",
      });
      return;
    }
    if (auth.user) {
      postSensorInfo();
    }
  };

  const postSensorInfo = async () => {
    try {
      await contractCall(auth, "addSensor", [cropId, data.name]);
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Success",
        severity: "success"
      });

      router.replace(`/farm/${farmId}/crop/${cropId}`);
    } catch (err) {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Failure",
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
            placeholder: 'NPK Sensor',
          },
        ]}
        setData={setData}
        data={data}
      />}
      title="Register your sensor"
      text="Improve your credibility by providing continuous sensor data."
      image="/images/plant.png"
    />
  );
}
