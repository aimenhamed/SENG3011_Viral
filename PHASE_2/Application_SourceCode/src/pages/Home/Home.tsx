import { useDispatch } from "react-redux";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  getSubscriptionDispatch,
  LoadingStatusTypes,
  selectAPP,
} from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
  const dispatch = useDispatch();
  const { loadingStatus, app, error } = useAppSelector(selectAPP);
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

    return <div>Hi</div>;
  }

  return <LoadingPage />;
};

export default Home;
