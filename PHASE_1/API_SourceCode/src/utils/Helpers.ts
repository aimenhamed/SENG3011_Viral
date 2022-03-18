import { IncomingHttpHeaders } from "http";
import { ISearchRequestHeaders, IPeriodOfInterest, Log } from "IApiResponses";
import { baseLog } from "./Constants";

export const parseHeaders = (
  headers: IncomingHttpHeaders
): ISearchRequestHeaders => {
  const poiString = String(headers.period_of_interest);
  const periodOfInterest: IPeriodOfInterest = JSON.parse(poiString);

  const keyTermsString = String(headers.key_terms);
  const keyTerms: string[] = JSON.parse(keyTermsString);

  const location: string = JSON.parse(headers.location as string);

  return {
    periodOfInterest,
    location,
    keyTerms,
  };
};

export const getLog = (date: Date): Log => {
  return {
    ...baseLog,
    accessTime: date.toTimeString(),
  };
};
