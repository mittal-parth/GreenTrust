import QRCode from "react-qr-code";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import IconButton from "@/components/IconButton";


export default function QRCard({ value }) {
    const qrId = "qr-img";

    const downloadQR = () => {
        // const canvas = document.getElementById(qrId);
        // console.log(canvas);
        // const pngUrl = canvas
        //     .toDataURL("image/png")
        //     .replace("image/png", "image/octet-stream");

        // let downloadLink = document.createElement("a");
        // downloadLink.href = pngUrl;
        // downloadLink.download = `${value}.png`;
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
    };

    return (<div className="p-6 rounded-xl">
        <p className="text-primary text-lg font-bold">QR</p>
        <div>
            <QRCode value={value} className="w-full" size={128} id={qrId} />
        </div>
        <div className="flex mt-2 justify-center">
            <IconButton icon={faDownload} onClick={() => downloadQR()} styles="bg-transparent !text-gray" />
        </div>
    </div>)
}
