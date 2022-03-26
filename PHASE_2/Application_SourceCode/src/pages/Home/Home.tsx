import { VectorMap } from "@react-jvectormap/core";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import { getSubscriptionDispatch, LoadingStatusTypes, selectAPP } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { worldMill } from '@react-jvectormap/world'
import { ISVGElementStyleAttributes } from "@react-jvectormap/core/dist/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
	const dispatch = useDispatch();
	const {loadingStatus, app, error} = useAppSelector(selectAPP);

	const regionStyle: ISVGElementStyleAttributes = {
		initial: {
			fill: 'green',
		},
	}

	const regionClick =  (e: Event, c: String) => {
		console.log(c)
	}

	if (error) {
		return <div>Error</div>;
	}

	if (loadingStatus === LoadingStatusTypes.IDLE) {
		dispatch(getSubscriptionDispatch());
	}

	if (loadingStatus === LoadingStatusTypes.GET_SUBSCRIPTION_COMPLETED) {
		if (!app.subscriptionId) {
		return <div>Not onboarded</div>;
		}

		return (

		<div style={{width: '100vw', height: '100vh', paddingRight: '50px', paddingLeft: '50px', boxSizing: 'border-box'}}>
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
				<div>
					<h1>
						Select a destination
					</h1>
				</div>
				<div>
					<FontAwesomeIcon icon={faMagnifyingGlass} style={{position: 'relative', right: '-25px'}} />
					<input type='text' style={{borderRadius: '5px', backgroundColor: '#e8e8e8', border: '0px', height: '25px', paddingLeft: '35px'}} placeholder='Search'></input></div>
				</div>
				<div style={{height: '80vh', paddingTop: '20px'}}>
					<VectorMap map={worldMill} onRegionClick={(e, c) => regionClick(e, c)} backgroundColor='white' regionStyle={regionStyle} />
				</div>
		</div>
		);
	}

	return <LoadingPage />;
};

export default Home;
