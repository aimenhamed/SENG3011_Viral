import { VectorMap } from "@react-jvectormap/core";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import { getSubscriptionDispatch, LoadingStatusTypes, selectAPP } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { worldMill } from '@react-jvectormap/world'
import { ISVGElementStyleAttributes } from "@react-jvectormap/core/dist/types";
import MenuBar from "src/components/MenuBar/MenuBar";
import SearchBar from "src/components/SearchBar/SearchBar";
import Legend from "src/components/Legend/Legend";
import LoadingPage from "../LoadingPage/LoadingPage";
//import DropdownBox from "src/components/DropdownBox/DropdownBox";
//import popup from "src/components/Popup/PopupBox"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Popup } from "semantic-ui-react";
//import PopupBox from "src/components/Popup/PopupBox";
//import "@progress/kendo-theme-default/dist/all.css";
import Box from '@material-ui/core/Box';
  

const OutbreakArticles = () => {
	const dispatch = useDispatch();
	const {loadingStatus, app, error} = useAppSelector(selectAPP);

	// ===== changing country/region colours ===== \\
	
	const regionStyle: ISVGElementStyleAttributes = {
		initial: {
			fill: '#2a9763',
		},
	}

	const styles = {
		rectangle: {
			width: '100px',
			height: '100px',
		}
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
								Search for article outbreaks
                                

                                <h3>
									<div style={{fontSize: '20px', right: '-20px'}}>
									<FontAwesomeIcon icon={faMagnifyingGlass} style={{position: 'absolute', right: '1050px', top: '117px' }} />
									</div>
									<div style={{fontSize: '20px', right: '500px'}}>
                					<input type='text' style={{borderRadius: '5px', backgroundColor: '#e8e8e8', border: '0px', height: '45px', paddingLeft: '200px', right: "500px", textAlign: "center", textAlignLast: "left"}} placeholder= "Search country articles" onChange={(e) => searchRegion(e.target.value)}></input>
									{/*<div text={{fontSize: '20px', right: '-20px'}}></div>*/}
                                	{/*<SearchBar />*/}
									
									</div>

                                </h3>
								<h2>
                                    <div style={{fontSize: '14px'}}>
                                    Results
                                    </div>
                                </h2>
							</h1>
						</div>
						{/*<FontAwesomeIcon icon={faMagnifyingGlass} style={{position: 'relative', right: '-25px'}} />*/}
                {/*<input type='text' style={{borderRadius: '5px', backgroundColor: '#e8e8e8', border: '0px', height: '45px', paddingLeft: '35px'}} placeholder='Search a country' onChange={(e) => searchRegion(e.target.value)}></input>*/}
						<SearchBar />
                        
					</div>
					{/*<div style={{height: '80vh', paddingTop: '20px'}}>
						<VectorMap map={worldMill} onRegionClick={(e, c) => regionClick(e, c)} backgroundColor='white' regionStyle={regionStyle} />
		</div>*/}
					{/*<Legend />*/}
					<div>
						<Button> hello new button </Button>
						
						<div style={{ width: '30%', left: "500px", height: "-400px"}}>
							<Box color="white" bgcolor="green" p={1}>
							Article blah blah
							rectangle={styles.rectangle} 
							</Box>
						</div>
						{/*<PopupBox />*/}
						
						</div>
					
				</div>
			</div>
		);
	}

	return <LoadingPage />;
};

export default OutbreakArticles;
function searchRegion(value: string): void {
	throw new Error("Function not implemented.");
}

