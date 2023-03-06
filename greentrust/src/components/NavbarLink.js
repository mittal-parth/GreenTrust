import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavbarLink ({ link, icon, tooltip }) {
    return (<Link href={link}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray/10 hover:bg-gray/20" title={tooltip}>
            <FontAwesomeIcon
                icon={icon}
                className="text-gray"
            />
        </div>
    </Link>)
}
