import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
    return (<a>
        <div className="flex flex-row gap-[12px]">
            <Image src="/logo.png" width={64} height={64}></Image>
            <div>
                <p className="text-center">
                    <span className="text-primary font-extrabold text-3xl font-poppins block">Green</span>
                    <span className="text-darkGray block uppercase font-bold text-xl tracking-widest">Trust</span>
                </p>
            </div>
        </div>
    </a>);
}