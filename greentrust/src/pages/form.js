import Input from "@/components/Input";

export default function Form() {
  return (
    <div className="flex flex-col gap-12 md:flex-row justify-center px-16 md:px-72 pt-8 md:pt-12">
      <div className="text-center flex flex-col items-center gap-8">
        <img
          src="./images/profile-builder.png"
          className="md:mr-10 my-auto object-none "
        ></img>
        <p className="w-fit mx-3 font-bold text-4xl text-center text-primary font-comfortaa">
          Build your profile
        </p>
        <p className="w-fit mx-3 text-2xl text-darkGray font-comfortaa">
          Fill up the details asked and upload supporting documents
        </p>
      </div>
      <div className="flex flex-col justify-center flex-1">
        <Input />
    
      </div>
      
    </div>
  );
}
