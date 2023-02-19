import React from 'react';

import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFile } from '@fortawesome/free-solid-svg-icons';

import Info from "@/components/Info";


export default function DropZone({ label, setFiles, isMultiple }) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        multiple: isMultiple ?? false,
    });

    const files = acceptedFiles.map(file => {
        setFiles(acceptedFiles);
        
        return (<li key={file.path}>
            <Info text={`${file.path} - ${file.size} bytes`} icon={faFile} style="text-gray" />
        </li>)
    });

    return (
        <div className="mb-6 w-full" id="dropzone">
            <label
                className="block text-gray text-sm font-semibold mb-2.5"
            >
                {label}
            </label>
            <div {...getRootProps({ className: "dropzone w-full bg-gray/10 flex justify-center items-center py-12 rounded-xl border-darkGray border-[1px] cursor-pointer mb-4" })}>
                <input {...getInputProps()} />
                <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className={`w-[20px] h-[20px] text-gray`}
                />
            </div>
            <ul>{files}</ul>
        </div>
    ); 
}
