import { useRouter } from "next/router";


export default function RoleCard({ name, imagePath, path }) {
  const router = useRouter();

  return (
    <div className="rounded-[20px] p-10 shadow-xl flex justify-center items-center transform hover:scale-105 cursor-pointer" onClick={() => router.push(path)}>
      <div className="flex flex-row md:flex-col justify-around items-center">
        <img
          src={imagePath}
          className="w-[200px] h-[200px]"
        ></img>
        <p className="w-[7rem] font-bold text-2xl text-center text-gray-700 font-comfortaa pt-4">
          {name}
        </p>
      </div>
    </div>
  );
}
