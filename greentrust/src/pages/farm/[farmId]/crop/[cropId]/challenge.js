import { useState } from "react";

import FormPage from "@/components/FormPage";
import Form from "@/components/Form";


export default function Challenge() {
    const [challenge, setChallenge] = useState({});
    const [supportingDocs, setSupportingDocs] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('debug:', challenge, supportingDocs[0]);
    }

    return (<>
        <FormPage
            form={<Form
                handleSubmit={handleSubmit}
                fields={[
                    {
                        label: 'Description',
                        placeholder: '',
                        type: 'textarea'
                    },
                    {
                        label: 'Supporting documents',
                        id: 'pic',
                        isFile: true,
                        setFile: setSupportingDocs,
                    },
                ]}
                setData={setChallenge}
                data={challenge}
            />}
            title="Raise a challenge"
            text="We appreciate your effort. Fill up the details asked and upload supporting documents. Your issue will be presented to a licensed verifier at the earliest. Thank you!"
            image="/images/profile-builder.png"
        />
    </>)
}
