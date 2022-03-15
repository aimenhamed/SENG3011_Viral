import { IncomingHttpHeaders } from "http";
import { ISearchRequestHeaders, IPeriodOfInterest } from "IApiResponses";

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
