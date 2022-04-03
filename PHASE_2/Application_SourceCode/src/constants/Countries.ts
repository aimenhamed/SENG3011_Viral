import { AmadeusData } from "src/interfaces/ResponseInterface";
import { Advice, Country } from "src/interfaces/ViralInterface";

export const USA: Country = {
  name: "USA",
  code: "US",
  countryId: "",
  coords: [],
};

export const usaAdvice: Advice = {
  adviceId: "84ee17ac-c345-48d8-9c99-1c6c7616c775",
  url: "https://www.smartraveller.gov.au/destinations/europe/ukraine",
  country: {
    countryId: "b1b08336-d818-4e09-adbb-08b55895f34b",
    name: "Ukraine",
    code: "UA",
    coords: [49, 32],
  },
  continent: "Europe",
  adviceLevel: "Do not travel",
  latestAdvice:
    "The Russian invasion of Ukraine is ongoing. The security situation continues to be volatile and is deteriorating rapidly. Infrastructure and military facilities have been struck by rocket attacks in Lviv. Heavy fighting, including bombardments, explosions and missile launches, is ongoing throughout Ukraine. There have been many civilian casualties. Foreigners have been killed and may be targeted, including in areas not directly affected by fighting. Do not travel to Ukraine, there is a real risk to life.  If you’re in Ukraine, shelter in place until you judge it’s safe to depart. Seek shelter in a hardened structure away from windows. Review your personal security plans. Be alert and aware of your surroundings. Continue to monitor advice on Smartraveller and reputable local and international media. Where it is safe to do so, you should leave Ukraine. You're responsible for your own safety and that of your family.",
  lastUpdate: "2022-03-30",
};

export const amadeusMock: AmadeusData = {
  area: {
    name: "Ukraine",
  },
  summary:
    "<p>Health authorities confirmed the first case of COVID-19 in Chernivtsi on 3 March 2020, after a patient who had recently travelled to Italy tested positive for the virus. Most restrictions have been lifted and the country is open to international travel. Despite a fall in incidence rates, hundreds of new cases continue to be reported daily.</p>",
  diseaseRiskLevel: "Medium",
  diseaseInfection: {
    date: "2021-09-05",
    level: "Medium",
  },
  diseaseCases: {
    date: "2021-06-22",
    deaths: 54220,
    confirmed: 2292295,
  },
  areaAccessRestriction: {
    transportation: {
      date: "2021-09-12",
      text: "<p>Ukraine International Airlines (UIA) and other airlines are operating limited international flights primarily through Kyiv Boryspil International Airport (KBP/UKBB) and Kyiv International Airport (IEV/UKKK).</p>",
      isBanned: "No",
    },
    quarantineModality: {
      date: "2021-09-02",
      text: "<p>Unvaccinated travellers who arrive from or stayed in India or Russia within the past seven days must quarantine for 14 days. The quarantine period cannot be shortened.</p> <p>Unvaccinated travellers arriving from other countries must obtain a negative COVID-19 test result within 72 hours after arrival or self-quarantine for 10 days.</p>",
      rules: "https://visitukraine.today/",
    },
    mask: {
      date: "2021-09-13",
      text: "<p>A face mask covering the mouth and nose must be worn inside public buildings and on public transport. The requirement to wear face masks on public transport extends to airports, including Kyiv Boryspil International Airport. UIA passengers must wear face masks at the airport and on board the aircraft.</p>",
      isRequired: "Yes",
    },
    exit: {
      date: "2021-09-07",
      text: "<p>There are no special requirements to exit the country.</p>",
      isBanned: "No",
    },
    diseaseVaccination: {
      date: "2021-09-02",
      isRequired: "No",
      acceptedCertificates: [
        "EU Digital COVID Certificate",
        " Ukraine certificate",
      ],
      qualifiedVaccines: [
        "Pfizer - 14 days after second dose.",
        "AstraZeneca (Vaxzevria) - 14 days after second dose.",
        "AstraZeneca (South Korea) - 14 days after second dose.",
        "AstraZeneca (India) - 14 days after second dose.",
        "Johnson & Johnson - 14 days after first dose.",
        "Sinopharm Phase 1 - 14 days after second dose.",
        "Sinovac - 14 days after second dose.",
        "Moderna - 14 days after second dose.",
      ],
      policy: "Yes",
    },
  },
  areaVaccinated: [
    {
      date: "2021-09-04",
      vaccinationDoseStatus: "oneDose",
      percentage: 12.734,
    },
    {
      date: "2021-09-10",
      vaccinationDoseStatus: "fully",
      percentage: 10.88,
    },
  ],
  hotspots: "",
};
