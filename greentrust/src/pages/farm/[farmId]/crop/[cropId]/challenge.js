

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (supportingDocs.length == 0) {
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: "Please upload a govt. issued ID card",
            });
            return;
        }
        var fileNames = supportingDocs.map((supportingDocs) => supportingDocs.path);
        const proofHashes = await uploadFile(Object.values(supportingDocs));
        let supportingDocsHashes = ''
        proofHashes.forEach((fH , index) => {
            var proof = {}
            proof.name = fileNames[index]?.split(".")[0] || "Proof"
            proof.hash = fH[0].hash
            data.proofs = [...data.proofs, proof]
        });

        if(auth.user){
            data = JSON.stringify(data)
            console.log(data, "data")
            postChallengeInfo(data);
        }

    }

    const postChallengeInfo = async (supportingDocs) => {
        setLoading(true);

        try {

            console.log(cropId, challenge.description, supportingDocs , "Challenge data")
            await contractCall(auth, 'addChallenge', [
                cropId,
                challenge.description,
                supportingDocs,
                {value: CHALLENGE_AMOUNT}
            ]);

            router.replace('/dashboard');
        }
        catch (err) {
            console.log(err);
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: "Failure",
            });
        }

        setLoading(false);
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
                        id: 'pic',
                        isFile: true,
                        isMultiple: true,
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
