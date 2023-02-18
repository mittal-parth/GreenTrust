import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/auth/useAuth";

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
        setLoading(true);
        
        e.preventDefault();
        let proofsData = {}
        proofsData.proofs = []
        // Hashing pic
        if (pic) {
            await uploadFile(Object.values(pic)).then((res) => {
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
        const proofHashes = await uploadFile(Object.values(proofs));
        var docHashes = ''
        var fileNames = proofs.map((proof) => proof.path);
        
        proofHashes.forEach((fH,index) => {
            var proof = {}
            proof.name = fileNames[index]?.split(".")[0] || "Proof"
            proof.hash = fH[0].hash
            proofsData.proofs = [...proofsData.proofs, proof]
        });
        proofsData = JSON.stringify(proofsData)
        postFarmerInfo(JSON.stringify(data), proofsData);
    };

    const postFarmerInfo = async (profile, proofsData) => {

        try {
            await contractCall(auth, 'registerFarmer', [
                profile,
                proofsData,
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
