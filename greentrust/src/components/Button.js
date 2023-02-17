import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ text, icon, styles, onClick }) {
  return (
    <a>
      <div
        onClick={onClick}
        class={`flex flex-row transform hover:scale-105 bg-primary text-white text-2xl px-10 py-1 items-center rounded-full justify-center cursor-pointer ${styles ?? ''} w-fit`}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "white" }}
          className="mr-2 w-5 h-5"
        />
        <p>{text}</p>
      </div>
    </a>
  );
}
