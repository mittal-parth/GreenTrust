import { useState, useEffect, useContext } from "react";

import { contractCall, getChallengeStatusCode } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import ChallengeCard from "@/components/ChallengeCard";
import Empty from "@/components/Empty";


export default function VerifierDashboard() {
	const auth = useAuth();

	const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
	const { loading, setLoading } = useContext(LoaderContext);

	const [pendingReviews, setPendingReviews] = useState(null);
	const [raisedChallenges, setRaisedChallenges] = useState(null);
	const [archive, setArchive] = useState(null);
	const [challenges, setChallenges] = useState(null);
	const [verifierId, setVerifierId] = useState(null);
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
				setChallenges(res.data);

				setPendingReviews(res.data?.filter((challenge) => challenge.status == getChallengeStatusCode("ALLOTED") && parseInt(challenge.verifierId._hex) == parseInt(verifierIdRes.data._hex)));
				setRaisedChallenges(res.data?.filter((challenge) => challenge.status == getChallengeStatusCode("OPEN") && parseInt(challenge.verifierId._hex) != parseInt(verifierIdRes.data._hex)));
				setArchive(res.data?.filter((challenge) => (challenge.status == getChallengeStatusCode("SUCCESSFUL") || challenge.status == getChallengeStatusCode("REJECTED"))));
			}
		}
		catch (err) {
			console.log(err);
			setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
		}

		setLoading(false);
	};

	return (
		<div>
			<div>
				<h1 className="mb-0 text-red">Pending Reviews</h1>
				<div className="flex"> {pendingReviews && pendingReviews.length > 0 ?
					pendingReviews?.map((challenge, index) => (
						<ChallengeCard key={index} challenge={challenge} auth={auth} status={0} />
					)) : <Empty text="You do not have any pending reviews" />}</div>

				<h1 className="mb-0">Raised Challenges</h1>
				<div className="flex">{raisedChallenges && raisedChallenges.length > 0 ?
					raisedChallenges?.map((challenge, index) => (
						<ChallengeCard key={index} challenge={challenge} auth={auth} status={1} />
					)) : <Empty text="Empty!" />}</div>

				<h1 className="mb-0 text-gray">Archive</h1>
				<div className="flex">
					{archive && archive.length > 0 ?
						archive?.map((challenge, index) => (
							<ChallengeCard key={index} challenge={challenge} auth={auth} status={2} />
						)) : <Empty text="Empty!" />}
				</div>
			</div>
		</div>
	);
}
