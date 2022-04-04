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

type CountryProps = {
  countryName: string;
};

const Country = ({ countryName }: CountryProps) => {
  const dispatch = useDispatch();
  const { advice, adviceloadingStatus } = useAppSelector(selectAdvice);

  useEffect(() => {
    dispatch(getSpecificAdviceDispatch(countryName));
  }, []);

  if (adviceloadingStatus === AdviceLoadingStatusTypes.GET_ADVICE_LOADING) {
    return <LoadingPage />;
  }

  if (advice) {
    return <CountryReport advice={advice!} country={countryName} />;
  }
  return <></>;
};

export default Country;
