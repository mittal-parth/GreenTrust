import { useRouter } from "next/router";

import FormPage from "@/components/FormPage";
import FarmerRegistrationForm from "@/components/FarmerRegistrationForm";
import VerifierRegistrationForm from "@/components/VerifierRegistrationForm";


export default function Register() {
    const router = useRouter();

    const { type } = router.query;

    return (<>
        <FormPage
            form={type == "farmer" ? <FarmerRegistrationForm /> : <VerifierRegistrationForm />}
            title="Build your profile"
            text="Fill up the details asked and upload supporting documents."
            image="/images/profile-builder.png"
        />
    </>)
}
