import { useState, useEffect, useContext } from "react";
import { contractCall, getChallengeStatusCode } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";

import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import ChallengeCard from "@/components/ChallengeCard";
 import classes from "../style";
import Button from "@/components/Button";


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
                const res = await contractCall(auth, 'fetchAllChallenges');
                console.log(res.data,verifierIdRes.data ,"verifier data")
                setChallenges(res.data);
                console.log("debug",res.data)
                console.log("debug", verifierIdRes.data._hex);
                setPendingReviews(res.data?.filter((challenge) => challenge.status == getChallengeStatusCode("ALLOTED") && parseInt(challenge.verifierId._hex) == parseInt(verifierIdRes.data._hex)));
                setRaisedChallenges(res.data?.filter((challenge) => challenge.status == getChallengeStatusCode("OPEN") && parseInt(challenge.verifierId._hex) != parseInt(verifierIdRes.data._hex)) );
                setArchive(res.data?.filter((challenge) => (challenge.status == getChallengeStatusCode("SUCCESSFUL") || challenge.status == getChallengeStatusCode("REJECTED") ) ));
            }}
            
            catch (err) {
                console.log(err);
                setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
            }
            
            setLoading(false);
        };
        
        
        return (
            <div>
    <div>
            <Button
                text="Get Farms"
                icon = {faLeaf}
                styles="bg-write !px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0"
                onClick={() => {
                    window.location.href = "/farms";
                }}
            />
         <h2 className={`${classes.title} mt-12`}>Pending Reviews</h2>
           {pendingReviews && pendingReviews.length > 0 ?
            pendingReviews?.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} auth={auth} type = {0}/>
            )) : <h3 className= "font-comfortaa, text-darkGray text-sm" >No pending reviews</h3>}
         
         <h2 className={`${classes.title} mt-12`}>Raised Challenges</h2>
         {raisedChallenges && raisedChallenges.length > 0 ?
            raisedChallenges?.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} auth={auth} type={1}/>
            )) : <h3 className= "font-comfortaa, text-darkGray text-sm" >No raised challenges</h3>}
         
         <h2 className={`${classes.title} mt-12`}>Archive</h2>
            {archive && archive.length > 0 ?
            archive?.map((challenge, index) => (  
                <ChallengeCard key={index} challenge={challenge} auth={auth} type={2}/>
            )): <h3 className= "font-comfortaa, text-darkGray text-sm" >No challenges in archive</h3>}
    </div>



    </div>);
}
