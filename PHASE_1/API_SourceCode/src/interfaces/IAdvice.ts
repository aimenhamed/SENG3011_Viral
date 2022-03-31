export interface Advice {
  adviceId: string;
  url: string;
  country: string;
  continent: string;
  adviceLevel: string;
  latestAdvice: string;
  lastUpdate: Date;
}

export interface IAdviceOnly {
  country: string;
  adviceLevel: string;
}