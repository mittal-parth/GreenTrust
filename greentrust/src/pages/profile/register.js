import { useRouter } from "next/router";

import FormPage from "@/components/FormPage";
import FarmerRegistrationForm from "@/components/FarmerRegistrationForm";
import VerifierRegistrationForm from "@/components/VerifierRegistrationForm";
import profile from '@/../../public/lotties/profile-builder.json';

export default function Register() {
    const router = useRouter();

    const { type } = router.query;

    return (<>
        <FormPage
            form={type == "farmer" ? <FarmerRegistrationForm /> : <VerifierRegistrationForm />}
            title="Build your profile"
            text="Fill up the details asked and upload supporting documents."
            image={profile}
            imageStyle={type == "farmer" ? "!max-w-[20vw]" : ""}
        />
    </>)
}
