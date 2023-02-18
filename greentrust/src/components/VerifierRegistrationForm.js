import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/auth/useAuth";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";
import Form from "@/components/Form";


export default function VerifierRegistrationForm() {
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

    const [verifierProfile, setVerifierProfile] = useState({});
    const [ids, setIds] = useState([]);
    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (ids.length == 0) {
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: `Please upload a govt. issued ID card`,
            });
            return;
        }

        const fileHashes = await uploadFile(Object.values(ids));
        let idCardsHash = ""
        fileHashes.forEach((fH) => {
            idCardsHash += fH[0].hash + " "
        });

        postVerifierInfo(idCardsHash);
    };

    const postVerifierInfo = async (idCardsHash) => {
        setLoading(true);

        try {
            await contractCall(auth, "registerVerifier", [
                verifierProfile.name,
                verifierProfile.currentAddress,
                idCardsHash,
            ]);
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: `Registration successful`,
                severity: "success",
            });

            router.replace('/dashboard');
        } catch (err) {
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: `Registration failed`,
            });
        }

        setLoading(false);
    };


    return (
        <Form
            handleSubmit={handleSubmit}
            fields={[
                {
                    label: 'Name',
                    placeholder: 'Jane Doe',
                },
                {
                    label: 'Address',
                    placeholder: '1234 Main St',
                    dataLabel: 'currentAddress'
                },
                {
                    label: 'ID',
                    isFile: true,
                    isMultiple: true,
                    setFile: setIds,
                }
            ]}
            setData={setVerifierProfile}
            data={verifierProfile}
        />
    );
}
