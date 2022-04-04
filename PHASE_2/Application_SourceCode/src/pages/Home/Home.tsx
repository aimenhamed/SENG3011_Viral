import { useDispatch } from "react-redux";
import {VectorMap} from "@react-jvectormap/core";
import { useAppSelector } from "src/logic/redux/hooks";
import { getSubscriptionDispatch, LoadingStatusTypes, selectAPP } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { worldMill } from '@react-jvectormap/world'
import { ISVGElementStyleAttributes } from "@react-jvectormap/core/dist/types";
import MenuBar from "src/components/MenuBar/MenuBar";
import SearchBar from "src/components/SearchBar/SearchBar";
import Legend from "src/components/Legend/Legend";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
	const dispatch = useDispatch();
	const {loadingStatus, app, error} = useAppSelector(selectAPP);

	// ===== changing country/region colours ===== \\
	
	const regionStyle: ISVGElementStyleAttributes = {
		initial: {
			fill: '#2a9763',
		},
	}

	// =====================================

	// ===== event handlers ===== \\
	
	const regionClick =  (e: Event, c: String) => {
		console.log(c)
	}
	// =====================================

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
			<div style={{display: 'flex'}}>
				<MenuBar />
				<div style={{width: '100vw', height: '100vh', paddingRight: '50px', paddingLeft: '50px', boxSizing: 'border-box'}}>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
						<div>
							<h1>
								Select a destination 1
							</h1>
						</div>
						<SearchBar />
					</div>
					<div style={{height: '80vh', paddingTop: '20px'}}>
						<VectorMap map={worldMill} onRegionClick={(e, c) => regionClick(e, c)} backgroundColor='white' regionStyle={regionStyle} />
					</div>
					<Legend />
				</div>
			</div>
		);
	}

	return <LoadingPage />;
};

export default Home;
