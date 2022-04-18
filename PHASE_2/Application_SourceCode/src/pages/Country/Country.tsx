import { useEffect } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { useDispatch } from "react-redux";
import {
  AdviceLoadingStatusTypes,
  getSpecificAdviceDispatch,
  selectAdvice,
} from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import LoadingPage from "src/components/LoadingPage/LoadingPage";
import CountryReport from "src/components/CountryReport/CountryReport";
import { useHistory, useParams } from "react-router-dom";

const Country = () => {
  const history = useHistory();
  const params = useParams<{countryName: string}>();
  const dispatch = useDispatch();
  const { advice, adviceloadingStatus } = useAppSelector(selectAdvice);
  const { countryName } = params;

  useEffect(() => {
    dispatch(getSpecificAdviceDispatch(countryName));
  }, []);

  if (adviceloadingStatus === AdviceLoadingStatusTypes.GET_ADVICE_LOADING) {
    return <LoadingPage />;
  }

  if (adviceloadingStatus === AdviceLoadingStatusTypes.GET_ADVICE_FAILED) {
    history.push("/home");
  }

  if (advice) {
    return <CountryReport advice={advice!} country={countryName} />;
  }
  return <></>;
};

export default Country;
