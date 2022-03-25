import { VectorMap } from "@react-jvectormap/core";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import { getSubscriptionDispatch, LoadingStatusTypes, selectAPP } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { worldMill } from '@react-jvectormap/world'
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
  const dispatch = useDispatch();
  const {loadingStatus, app, error} = useAppSelector(selectAPP);
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



	/* const iProjectionObj: IProjection = {
		type: string,
		centralMeridian: number,
	}

	const iVectorMapObj: IVectorMap = {
		name: "world_mill",
    	content: {
			insets: IInset[],
			paths: PathsDefinition,
			height: 100,
			width: 100,
			projection: iProjectionObj,
		},
	} */

    return (
      <div style={{width: '100vw', height: '100vh'}}>
		hi
		<VectorMap map={worldMill} />
      </div>
    );
  }

  return <LoadingPage />;
};

export default Home;
