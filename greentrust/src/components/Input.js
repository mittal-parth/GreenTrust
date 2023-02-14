import React, { useState } from "react";

export default function Input() {
  var errorMessage = "Please fill out this field";
  //  create an input with validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");




  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="mb-6 font-comfortaa">
        <form onSubmit={handleSubmit} >
        <InputBox label="Name" onChange={(e) => setName(e.target.value)}   placeHolder={"Name"} type={"text"}/>
        <InputBox label="Email" onChange={(e) => setEmail(e.target.value)}  placeHolder={"Email"} type={"email"}/>
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

function InputBox({ label, onChange, placeHolder, type }) {

  return (
    <div>
      <div className="mb-6 font-comfortaa">
        <label
          className=  "block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-1"
          for="grid-first-name"
        >
          {label}
        </label>
        <input
          className= {"block w-fit bg-transparent text-gray-700 border border-darkGray rounded-xl rounded py-1 px-4 mb-2 leading-tight focus:bg-white " }
          id="grid-first-name"
          type={type}
          placeholder={placeHolder}
          onChange={onChange}
        ></input>

        
      </div>
    </div>
  );
}
