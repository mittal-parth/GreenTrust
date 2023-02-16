export default function InputBox({ label, onChange, placeHolder, type, isMultiple }) {
    return (
      <div className="w-full">
        <div className="mb-5">
          <label
            className="block text-gray text-sm font-semibold mb-2.5"
            for={'form-' + label}
          >
            {label}
          </label>
          <input
            id={'form-' + label}
            className="block w-full bg-transparent text-darkGray border border-darkGray font-bold rounded-xl py-2.5 px-5 mb-2 focus:bg-white focus:border-none outline-1 focus:outline-primary"
            type={type}
            placeholder={placeHolder}
            onChange={onChange}
            {...(isMultiple ? { multiple: true } : {})}
          ></input>
        </div>
      </div>
    );
  }
  