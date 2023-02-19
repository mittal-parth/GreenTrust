import { BiRupee } from "@react-icons/all-files/bi/BiRupee";
import classes from "../style";

const StakeHolders = ({ stakeAmount }) => {
  var stakedHolders = Array(8).fill(
    <div className="flex-none">
      <img src="./images/jonathan.png" className="rounded-full mr-2"></img>
    </div>
  );
  return (
    <div>
      {" "}
      <p className="w-fit mx-3 mt-10 font-bold text-2xl text-center text-primary font-comfortaa pt-4  ">
        Stakeholders
      </p>
      <div className="flex mt-2 items-center mx-3">
        <BiRupee className="text-primary" />
        &nbsp;
        <p className={`${classes.paragraph}`}>{stakeAmount} </p>
      </div>
      <div className="flex m-3 pb-4 flex-no-wrap overflow-x-scroll scrolling-touch">
        {stakedHolders}
      </div>
    </div>
  );
};

export default StakeHolders;
