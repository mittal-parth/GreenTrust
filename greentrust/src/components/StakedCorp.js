
import { Icon } from '@iconify/react';

export default function StakedCorp({farmName, StakedDetails}){
    
    return (
        <div className=" h-[150px] rounded-[20px] md:w-[285px] md:h-[286px] shadow-xl flex flex-col   space-y-[2px] mx-[200px] my-[200px]">
            <div>
                <div>

                    <p className='font-comfortaa font-bold text-2xl text-darkGray'>{farmName}</p>

                </div>
            <div>

            <div className='flex flex-row w-full'>
                <img src="./images/mdi_plant-outline.png"  className='mx-[5px]'></img>
                <p className='font-comfortaa font-bold  text-darkGray '>{StakedDetails.get("cropName")}</p>
            </div>
            <div className='flex flex-row w-full '>
                <img src="./images/mdi_plant-outline.png"  className='mx-[5px]' ></img>
                <p className='font-comfortaa font-bold  text-darkGray '><span className='text-primary'><span>&#8377;</span>{StakedDetails.get("amountStaked") } /-</span> staked</p>
            </div>
            <div className='flex flex-row w-full '>
                <img src="./images/mdi_plant-outline.png"  className='mx-[5px]' ></img>
                <p className='font-comfortaa  font-bold text-darkGray '>{StakedDetails.get("dateStaked")}</p>
            </div>
            <div className='flex flex-row w-full '>
                <img src="./images/mdi_plant-outline.png"  className='mx-[5px]'></img>
                <p className='font-comfortaa font-bold  text-darkGray '>{StakedDetails.get("timeToMature")} (to mature)</p>
            </div>
            <div className='flex flex-row w-full '>
                <img src="./images/mdi_plant-outline.png"  className='mx-[5px]'></img>
                <p className='font-comfortaa font-bold  text-darkGray '>{StakedDetails.get("country")}</p>
            </div>
            </div>
            </div>
        </div>
    )
}


// function render(names) {
//     const data =[{"name":"test1"},{"name":"test2"}];
//    const listItems = data.map((d) => <li key={d.name}>{d.name}</li>;
   
//    return (
//      <div>
//      hello
//      </div>
//    );
//  }

