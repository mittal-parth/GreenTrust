export default function InputBox({ label, onChange, placeholder, type, isMultiple }) {
  return (
    <div className="w-full">
      <div className="mb-5">
        <label
          className="block text-gray text-sm font-semibold mb-2.5"
          for={'form-' + label}
        >
          {label}
        </label>
        {type != "textarea"
          ? <input
            id={'form-' + label}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            {...(isMultiple ? { multiple: true } : {})}
          ></input>
          : <textarea
            id={'form-' + label}
            onChange={onChange}
          ></textarea>
        }
      </div>
    </div>
  );
}
