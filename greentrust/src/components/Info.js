import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Info({ icon, text, style, iconDivStyle, textStyle }) {
    return (
        <div className="flex items-center px-0 py-0 flex-row gap-[10px]">
            <div className={`${iconDivStyle} flex justify-center items-center`}>
                <FontAwesomeIcon
                    icon={icon}
                    className={`w-[20px] h-[20px] ${style}`}
                />
            </div>
            <p className={`text-darkGray text-base ${textStyle}`}>
                {text}
            </p>
        </div>
    );
}
