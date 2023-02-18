import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({ icon, styles, onClick }) {
  return (
    <div
      onClick={onClick}
      class={`${styles ?? ""} flex justify-center items-center text-white bg-gray rounded-full w-8 h-8 hover:scale-105 cursor-pointer`}
    >
      {icon && <FontAwesomeIcon
        icon={icon}
        // style="w-[40px] h-[40px]"
      />}
    </div>
  );
}
