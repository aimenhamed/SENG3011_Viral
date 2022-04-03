import { VectorMap } from "@react-jvectormap/core";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import { getSubscriptionDispatch, LoadingStatusTypes, selectAPP } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { worldMill } from '@react-jvectormap/world'
import { ISVGElementStyleAttributes } from "@react-jvectormap/core/dist/types";
import MenuBar from "src/components/MenuBar/MenuBar";
import SearchBar from "src/components/SearchBar/SearchBar";
import Legend from "src/components/Legend/Legend";
import { useState } from "react";
import jvmCountries from "src/components/SearchBar/countries";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
	const dispatch = useDispatch();
	const {loadingStatus, app, error} = useAppSelector(selectAPP);
	const [showMap, setShowMap] = useState(true);
	const [heading, setHeading] = useState('Select a destination')
	
	const regionStyle: ISVGElementStyleAttributes = {
		initial: {
			fill: '#2a9763',
		},
	}
	
	const regionClick =  (e: Event, c: string) => {
		const country = Object.entries(jvmCountries).filter((obj) => obj[0]===c)
		

		setShowMap(false)
		setHeading(country[0][1]['name'])
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
			<div style={{display: 'flex'}}>
				<MenuBar />
				<div style={{width: '100vw', height: '100vh', paddingRight: '50px', paddingLeft: '50px', boxSizing: 'border-box'}}>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
						<div>
							<h1>
								{heading}
							</h1>
						</div>
						<SearchBar setHeading={setHeading} setShowMap={setShowMap} /> 
					</div>
					{/* SHOW MAP OR COUNTRY PAGE */}
					{
						showMap ? (
							<div id='mapDiv' style={{height: '80vh', paddingTop: '20px'}}>
								<VectorMap map={worldMill} onRegionClick={(e, c) => regionClick(e, c)} backgroundColor='white' regionStyle={regionStyle} />
								<Legend />
							</div>
						) : (
							<div>country page</div>
						)
					}
				</div>
			</div>
		);
	}

	return <LoadingPage />;
};

export default Home;
