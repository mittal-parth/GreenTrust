import { useState, useEffect, useContext } from "react";

import { contractCall, getChallengeStatusCode } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import ChallengeCard from "@/components/ChallengeCard";
import Empty from "@/components/Empty";
import CustomCarousel from "./CustomCarousel";


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

	const cardsResponsive = {
		lg: {
			breakpoint: { max: 3000, min: 1500 },
			items: 4,
		},
		md: {
			breakpoint: { max: 1500, min: 1200 },
			items: 3,
		},
		sm: {
			breakpoint: { max: 1200, min: 720 },
			items: 2,
		},
		xs: {
			breakpoint: { max: 720, min: 0 },
			items: 1,
		}
	};

	return (
		<div>
			<div>
				<h1 className="mb-0 text-red">Pending Reviews</h1>
				<div className="static my-8">
					{pendingReviews && pendingReviews.length > 0
						? <CustomCarousel responsive={cardsResponsive}>{pendingReviews?.map((challenge, index) => (
							<ChallengeCard key={index} challenge={challenge} auth={auth} status={1} />
						))}</CustomCarousel>
						: <Empty text="You do not have any pending reviews" />
					}
				</div>

				<h1 className="mb-0">Raised Challenges</h1>
				<div className="static my-8">
					{raisedChallenges && raisedChallenges.length > 0
						? <CustomCarousel responsive={cardsResponsive}>{raisedChallenges?.map((challenge, index) => (
							<ChallengeCard key={index} challenge={challenge} auth={auth} status={0} />
						))}</CustomCarousel>
						: <Empty text="You do not have any pending reviews" />
					}
				</div>

				<h1 className="mb-0 text-gray">Archive</h1>
				<div className="static my-8">
					{archive && archive.length > 0
						? <CustomCarousel responsive={cardsResponsive}>{archive?.map((challenge, index) => (
							<ChallengeCard key={index} challenge={challenge} auth={auth} status={2} />
						))}</CustomCarousel>
						: <Empty text="You do not have any pending reviews" />
					}
				</div>
			</div>
		</div>
	);
}
