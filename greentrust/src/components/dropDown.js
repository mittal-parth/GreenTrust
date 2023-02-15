export default function DropDown({ optionsList, name, onClick, label }) {
    var options = optionsList.map((option) => {
      return <option value={option}>{option}</option>;
    });
    return (
      <div className="mb-6">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1"
          htmlFor="grid-first-name"
        >
          {label}
        </label>
        <select
          key={name}
          name={name}
          onChange={onClick}
          className={
            "block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white "
          }
        >
          {options}
        </select>
      </div>
    );
  }
  