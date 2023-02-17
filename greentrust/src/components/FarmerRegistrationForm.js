import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@arcana/auth-react";

import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall, uploadFile } from "@/utils";
import Form from "@/components/Form";


export default function FarmerRegistrationForm() {
    const { loading, setLoading } = useContext(LoaderContext);
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


    const [data, setData] = useState({});

    const [pic, setPic] = useState([]);
    const [proofs, setProofs] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hashing pic
        if (pic) {
            await uploadFile([pic]).then((res) => {
                data.profilePic = res[0][0].hash;
            });
        }

        // Hashing IDs
        if (proofs.length == 0) {
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: "Please upload a govt. issued ID card",
            });
            return;
        }
        const proofHashes = await uploadFile(proofs.length == 1 ? [proofs] : Object.values(proofs));
        let idCardHashes = ''
        proofHashes.forEach((hash) => {
            idCardHashes += hash[0].hash + ' '
        });

        postFarmerInfo(JSON.stringify(data), idCardHashes);
    };

    const postFarmerInfo = async (profile, idCardHashes) => {
        setLoading(true);

        try {
            await contractCall(auth, 'registerFarmer', [
                profile,
                idCardHashes,
            ]);

            router.replace('/dashboard');
        }
        catch (err) {
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
                    label: 'Email',
                    placeholder: 'janedoe@greentrust.com',
                },
                {
                    label: 'Address',
                    placeholder: '1234 Main St',
                    dataLabel: 'currentAddress'
                },
                {
                    label: 'Farmer Id',
                    placeholder: '1234',
                    dataLabel: 'farmerId'
                },
                {
                    label: 'Profile Pic',
                    id: 'pic',
                    isFile: true,
                    setFile: setPic,
                },
                {
                    label: 'Document Proofs',
                    id: 'proofs',
                    isFile: true,
                    isMultiple: true,
                    setFile: setProofs,
                }
            ]}
            setData={setData}
            data={data}
        />
    );
}
