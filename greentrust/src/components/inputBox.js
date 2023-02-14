export default function InputBox({ label, onChange, placeHolder, type }) {
    return (
      <div>
        <div className="mb-6 font-comfortaa">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1"
            for="grid-first-name"
          >
            {label}
          </label>
          <input
            className={
              "block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white "
            }
            id="grid-first-name"
            type={type}
            placeholder={placeHolder}
            onChange={onChange}
          ></input>
        </div>
      </div>
    );
  }