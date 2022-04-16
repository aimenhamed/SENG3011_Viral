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
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

type CountryProps = {
  countryName: string;
  backToMap: () => void;
};

const Country = ({ countryName, backToMap }: CountryProps) => {
  const dispatch = useDispatch();
  const { advice, adviceloadingStatus } = useAppSelector(selectAdvice);

  useEffect(() => {
    dispatch(getSpecificAdviceDispatch(countryName));
  }, []);

  if (adviceloadingStatus === AdviceLoadingStatusTypes.GET_ADVICE_LOADING) {
    return <LoadingPage />;
  }

  if (adviceloadingStatus === AdviceLoadingStatusTypes.GET_ADVICE_FAILED) {
    backToMap();
  }

  if (advice) {
    return <CountryReport advice={advice!} country={countryName} />;
  }
  return (
    <VectorMap map={worldMill} />
  );
};

export default Country;
