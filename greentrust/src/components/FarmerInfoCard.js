import { getFile } from "@/utils";

export default function FarmerCard({ profile, onlyPic }) {
  profile = JSON.parse(profile);
  console.log(`https://ipfs.io/ipfs/${profile.profilePic}` , "Profile pic url")
  // console.log(getFile(profile.profilePic) , "Profile pic url")
  return (<>{onlyPic
      ? <img
        src={`https://ipfs.io/ipfs/${profile.profilePic}`}
        className="rounded-full w-[60px] h-[60px]"
        onError={(e) => (e.currentTarget.src = "/images/jonathan.png")}
      />
      : <div className="flex items-center gap-8 px-8 py-4">
        <div className="mr-4">
          <img
            src={`https://ipfs.io/ipfs/${profile.profilePic}`}
            className="rounded-full w-[60px] h-[60px]"
            onError={(e) => (e.currentTarget.src = "/images/jonathan.png")}
          />
        </div>
        <div>
          <p className="text-darkGray text-2xl font-bold">{profile.name}</p>
          <p className="text-gray text-base font-bold">{profile.email}</p>
        </div>
      </div>
  }</>);
}
