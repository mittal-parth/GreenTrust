export default function FarmerDefaultCard({farmerName, farmerEmail}) {
  return (
    <div className="flex items-center mx-3">
      <div className="mr-4">
       <img src = "./images/jonathan.png" className="rounded-full"></img>
      </div>
      <div>
        <p className="font-comfortaa text-darkGray text-2xl font-bold">{farmerName}</p>
        <p className="font-comfortaa text-darkGray  text-lg font-bold">{farmerEmail}</p>
      </div>
    </div>
  );
}
