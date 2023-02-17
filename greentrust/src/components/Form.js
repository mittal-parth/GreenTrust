import { useState } from "react";

import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import DropZone from "@/components/DropZone";


export default function Form({ handleSubmit, fields, setData, data }) {
    return (
        <div className="mb-6 font-comfortaa w-full">
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (<>{field.isFile
                    ? <DropZone label={field.label} setFiles={field.setFile} isMultiple={field.isMultiple} />
                    : <InputBox
                        label={field.label}
                        onChange={(e) =>
                            setData({ ...data, [field.dataLabel ?? field.label.toLowerCase()]: e.target.value })
                        }
                        placeholder={field.placeholder}
                        type="text"
                    />
                }</>))}
                <Button text="Submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}
