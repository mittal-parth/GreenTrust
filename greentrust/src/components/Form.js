import { useState, useContext } from "react";

import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import DropZone from "@/components/DropZone";
import { uploadFile } from "@/utils";
import { LoaderContext } from "@/context/loaderContext";
import { SnackbarContext } from "@/context/snackbarContext";



export default function Form({ handleSubmit, fields, setData, data }) {
    const { loading, setLoading } = useContext(LoaderContext);
    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

    const fileHashes = []

    async function submit() {
        setLoading(true);

        for (let field of fields) {
            if (!field.isFile) {
                continue;
            }

            try {
                if (field.isMultiple) {
                    const hashOfFiles = await uploadFile(Object.values(field.file));
                    let fileNames = field.file.map((f) => f.path);

                    const data = {}
                    data[field.dataLabel] = []

                    hashOfFiles.forEach((hash, index) => {
                        const f = {}
                        f.name = fileNames[index]?.split(".")[0] || "greentrust"
                        f.hash = hash[0].hash
                        data[field.dataLabel] = [...data[field.dataLabel], f]
                    });

                    field.setFile(JSON.stringify(data));
                    fileHashes.push(JSON.stringify(data))
                }
                else {
                    if (field.file) {
                        const res = await uploadFile(Object.values(field.file))
                        field.setFile(res[0][0].hash)
                        fileHashes.push(res[0][0].hash)
                    }
                }
            }
            catch (err) {
                console.log(`form debug: ${err}`)

                setSnackbarInfo({
                    ...snackbarInfo,
                    open: true,
                    message: `Please upload necessary files for ${field.dataLabel ?? field.label.toLowerCase()}`,
                });
            }
        }

        try {
            await handleSubmit(...fileHashes);

            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                severity: "success",
                message: "Success",
            });
        }
        catch (err) {
            setSnackbarInfo({
                ...snackbarInfo,
                open: true,
                message: `Error ${err.code}: ${err.message}`,
            });
        }

        setLoading(false);
    }

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
                        type={field.type ?? "text"}
                    />
                }</>))}
                <Button text="Submit" onClick={submit} />
            </form>
        </div>
    );
}
