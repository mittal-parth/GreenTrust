

import FormPage from "@/components/FormPage";
import Form from "@/components/Form";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { useAuth } from "@/auth/useAuth";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";
import { CHALLENGE_AMOUNT } from "@/config";

export default function Challenge() {
    
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const [challenge, setChallenge] = useState({});
    const [supportingDocs, setSupportingDocs] = useState([]);
    const router = useRouter();
    const {cropId} = router.query;
    const auth = useAuth();

    let data = {}
    data.proofs = []

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


    const handleSubmit = async (docsHash) => {
        await contractCall(auth, 'addChallenge', [
            cropId,
            challenge.description,
            docsHash,
            {value: CHALLENGE_AMOUNT}
        ]);

        router.push('/dashboard');
    };

    return (<>
        <FormPage
            form={<Form
                handleSubmit={handleSubmit}
                fields={[
                    {
                        label: 'Description',
                        placeholder: '',
                        type: 'textarea',
                        label: 'description',
                    },
                    {
                        label: 'Supporting documents',
                        isFile: true,
                        isMultiple: true,
                        setFile: setSupportingDocs,
                        file: supportingDocs,
                        dataLabel: 'proofs'
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
