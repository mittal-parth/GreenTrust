import { useState, useEffect, useContext } from "react";
import { contractCall, getChallengeStatusCode } from "@/utils";
import { useAuth } from "@arcana/auth-react";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import ChallengeCard from "@/components/ChallengeCard";
import classes from "../style";


export default function VerifierDashboard() {
    const auth = useAuth();
    
    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const { loading, setLoading } = useContext(LoaderContext);
    const [pendingReviews , setPendingReviews] = useState(null);
    const [raisedChallenges , setRaisedChallenges] = useState(null);
    const [archive , setArchive] = useState(null);
    const [challenges, setChallenges] = useState(null);
    const [verifierId, setVerifierId]= useState(null);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        if (auth.user) {
            fetchVerifierChallenges();
        }
    }, [auth?.user]);

    
    const fetchVerifierChallenges = async () => {
        setLoading(true);
        try {
          const res = await contractCall(auth, "fetchUserType");
          setUserType(res.data);
          if (res.data == "verifier") {
              const verifierIdRes = await contractCall(auth, "addressToVerifierIds", [
                  auth.user.address,
                ]);
                setVerifierId(verifierIdRes.data);
                const res = await contractCall(auth, 'fetchVerifierChallenges', [verifierIdRes.data]);
                console.log(res.data, "verifier data")
                setChallenges(res.data);
                setPendingReviews(challenges?.filter((challenge) => challenge.status == getChallengeStatusCode("OPEN") && challenge.verifierId == verifierIdRes.data));
                setRaisedChallenges(challenges?.filter((challenge) => challenge.status == getChallengeStatusCode("OPEN")));
                setArchive(challenges?.filter((challenge) => (challenge.status == getChallengeStatusCode("ACCEPTED") || challenge.status == getChallengeStatusCode("REJECTED") ) && challenge.verifierId == verifierIdRes.data));
            }}
            
            catch (err) {
                console.log(err);
                setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
            }
            
            setLoading(false);
        };
        
        
        return (
            <>
    <div>
         <h2 className={`${classes.title} mt-12`}>Pending Reviews</h2>
           {pendingReviews && pendingReviews.length > 0} ?
            {pendingReviews?.map((challenge) => (
                <ChallengeCard challenge={challenge} auth={auth} type = {0}/>
            ))} : <h3 className= "font-comfortaa, text-darkGray" >No pending reviews</h3>
         
         <h2 className={`${classes.title} mt-12`}>Raised Challenges</h2>
         {raisedChallenges && raisedChallenges.length > 0} ?
            {raisedChallenges?.map((challenge) => (
                <ChallengeCard challenge={challenge} auth={auth} type={1}/>
            ))} : <h3 className= "font-comfortaa, text-darkGray" >No raised challenges</h3>
         
         <h2 className={`${classes.title} mt-12`}>Archive</h2>
            {archive && archive.length > 0} ?
            {archive?.map((challenge) => (  
                <ChallengeCard challenge={challenge} type={""}/>
            ))}: <h3 className= "font-comfortaa, text-darkGray" >No challenges in archive</h3>
    </div>



    </>);
}
