import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import FormPage from "@/components/FormPage";
import Form from "@/components/Form";


export default function AddSensor() {
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  
  const router = useRouter();
  const { farmId, cropId } = router.query;

  const auth = useAuth();

  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    await contractCall(auth, "addSensor", [cropId, data.name]);

    router.replace(`/farm/${farmId}/crop/${cropId}`);
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
