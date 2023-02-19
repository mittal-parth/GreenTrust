import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";


export default function AccountCard({ auth }) {
    return (<div className="p-5 rounded-lg">
        <div className="mb-4">
          <p className="text-darkGray text-base font-bold">{auth?.user.name}</p>
          <p className="text-gray text-sm font-bold text-ellipsis overflow-hidden whitespace-nowrap" title={auth.user?.email}>{auth.user?.email}</p>
        </div>
        <div className="flex flex-row justify-around items-center">
            <FontAwesomeIcon 
                icon={faGear}
                className="text-primary text-xl cursor-pointer hover:scale-105"
            />
            <Button text="Logout" styles="bg-white border-[1.5px] border-primary !text-primary text-base hover:bg-primary hover:!text-white px-6"
                onClick={() => auth?.logout()}
            />
        </div>
    </div>)
}
