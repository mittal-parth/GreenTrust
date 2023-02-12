export default function RoleCard({name, imagePath}){
    return (
        <div className="rounded-[20px] w-[400px] h-[400px] shadow-xl flex justify-around items-center">
            
        <div className="flex flex-col justify-around items-center">
            <img src={imagePath} className="w-[200px] h-[200px] display: inline-block "
            ></img>
            <p className="w-32 h-10 not-italic font-bold text-3xl text-center text-gray-700 flex-none order-1 flex-grow-0 font-comfortaa pt-[20px]">{name}</p>
        </div>
            </div>
    );
}