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

    const handleSubmit = async (idCardsHash) => {
        await contractCall(auth, "registerVerifier", [
            verifierProfile.name,
            verifierProfile.currentAddress,
            idCardsHash,
        ]);

        router.replace('/dashboard');
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
                    file: ids,
                    dataLabel: 'ids'
                }
            ]}
            setData={setVerifierProfile}
            data={verifierProfile}
        />
    );
}
