import { Advice, Country } from "src/interfaces/ViralInterface";

export const USA: Country = {
  name: "USA",
  code: "US",
  countryId: "",
  coords: [],
};

export const usaAdvice: Advice = {
  country: USA,
  adviceId: "",
  url: "",
  continent: "North America",
  adviceLevel: "Stay home :)",
  latestAdvice:
    "The Russian invasion of Ukraine is ongoing. The security situation continues to be volatile and is deteriorating rapidly. Infrastructure and military facilities have been struck by rocket attacks in Lviv. Heavy fighting, including bombardments, explosions and missile launches, is ongoing throughout Ukraine. There have been many civilian casualties. Foreigners have been killed and may be targeted, including in areas not directly affected by fighting. Do not travel to Ukraine, there is a real risk to life.  If you’re in Ukraine, shelter in place until you judge it’s safe to depart. Seek shelter in a hardened structure away from windows. Review your personal security plans. Be alert and aware of your surroundings. Continue to monitor advice on Smartraveller and reputable local and international media. Where it is safe to do so, you should leave Ukraine. You're responsible for your own safety and that of your family.",
  lastUpdate: new Date(),
};
