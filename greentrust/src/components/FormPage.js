import Lottie from "react-lottie-player";

export default function FormPage({ image, title, text, form }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:justify-around md:mt-12">
      <div className="flex flex-col items-start mb-6 md:mb-0">
        <div className="md:flex shrink hidden mb-4 ">
          <Lottie loop animationData={image} play className="w-[45%]"/>
        </div>
        <h1 className="mb-4">{title}</h1>
        <p className="text-lg font-bold text-gray/70 max-w-[320px]">{text}</p>
      </div>
      <div className="flex w-full max-w-[400px] mx-auto md:mx-0">{form}</div>
    </div>
  );
}
