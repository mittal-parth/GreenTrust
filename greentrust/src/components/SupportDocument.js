import { faFile } from "@fortawesome/free-solid-svg-icons";

import Info from "@/components/Info";


export default function SupportDocument({ documents }) {
  console.log('debug:', documents);

  try {
    const documentList = documents.map((document) => {
      console.log('debug:', document);
      
      return (<div className="flex">
        <a target="_blank" href={"https://ipfs.io/ipfs/" + document.hash} rel="noopener noreferrer">
          <Info icon={faFile} text={document.name} />
        </a>
      </div>)
    });

    return (
      <div className="px-4 py-2">
        <div className=" mx-2 my-2">
          {documentList}
        </div>
      </div>
    );
  }
  catch (err) {
    return <></>
  }
}
