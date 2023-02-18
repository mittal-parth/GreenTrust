import Image from "next/image";


export default function Empty({ text }) {
    return (<div className="items-center flex flex-col w-[20vw] min-w-[280px]">
        <Image src="/em.gif" width={0} height={0} className="w-[15vw] min-w-[280px] bg-blend-multiply" alt="Empty" />
        <p className="text-gray text-center max-w-[200px]">{text}</p>
    </div>);
}