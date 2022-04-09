import { Advice } from "IAdvice";
import { CommentNoCountry } from "IComment";

export interface Country {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
  advice: Advice;
  comments: CommentNoCountry[];
}

export interface SimpleCountry {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
}
