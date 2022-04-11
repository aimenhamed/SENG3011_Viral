import { Advice } from "IAdvice";
import { CommentNoCountry } from "IComment";
import { ReviewNoCountry } from "IReview";

export interface Country {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
  advice: Advice;
  comments: CommentNoCountry[];
  reviews: ReviewNoCountry[];
}

export interface SimpleCountry {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
}
