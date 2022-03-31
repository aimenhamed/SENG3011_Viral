export interface Advice {
  adviceId: string;
  url: string;
  country: string;
  continent: string;
  adviceLevel: string;
  latestAdvice: string;
  lastUpdate: Date;
}

export interface AdviceOnly {
  country: string;
  adviceLevel: string;
}
