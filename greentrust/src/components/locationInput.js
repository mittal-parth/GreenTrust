export default function LocationInput({setLatitute, setLongitude}){

    function getLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLatitute(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position.coords.latitude);
        });
      }

      
    
    return (
        <div>
         <button
          onClick={getLocation}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3"
          type="submit"
        >
          Get Location
        </button>
      </div> 
    )
}