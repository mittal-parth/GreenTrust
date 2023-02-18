import { faFile } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import Info from "./Info";

export default function SupportDocument({documents}) {
    console.log("debu", documents);
    var documentList = documents.map((document) => {
        console.log("debug", document);
        return (<div className="flex">
            {/* <div>{ document.name}</div> */}
            <a target="_blank" href={"https://ipfs.io/ipfs/" + document.hash} rel="noopener noreferrer">
                 <Info icon={faFile} text={document.name} />
            </a>
        </div>)
}   );
  return (
    <div>
      <div className=" mx-2 my-2">
        {documentList}
        
      </div>
    </div>
  );
}
