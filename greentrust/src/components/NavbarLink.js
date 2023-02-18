import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavbarLink ({ link, icon }) {
    return (<Link href={link}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray/10 hover:bg-gray/20">
            <FontAwesomeIcon
                icon={icon}
                className="text-darkGray"
            />
        </div>
    </Link>)
}
