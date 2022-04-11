import { Article } from "IArticle";
import { Report } from "IReport";
import { ReportEntity } from "../entity/Report.entity";
import { ArticleEntity } from "../entity/Article.entity";
import { AdviceEntity } from "../entity/Advice.entity";
import mockArticles from "./data/small.json";
import { User } from "../interfaces/IUser";
import { UserEntity } from "../entity/User.entity";
import { convertArticleEntityToInterface } from "../converters/Article.converter";
import { convertAdviceEntityToInterface } from "../converters/Advice.converter";
import { CountryEntity } from "../entity/Country.entity";
import { Advice } from "IAdvice";
import { Country } from "ICountry";
import { convertCommentEntityToInterface } from "../converters/Comment.converter";
import { convertCountryEntityToInterface } from "../converters/Country.converter";

export const getReportEntity = (): ReportEntity => {
  const report = getMockReports()[0];
  const reportEntity = new ReportEntity();
  reportEntity.reportId = report.reportId;
  reportEntity.articleId = "art-123";
  reportEntity.diseases = report.diseases;
  reportEntity.eventDate = report.eventDate;
  reportEntity.locations = report.locations;
  reportEntity.syndromes = report.syndromes;
  return reportEntity;
};

export const getArticleEntity = (): ArticleEntity => {
  return {
    articleId: "art-123",
    url: mockArticles[0].URL,
    dateOfPublication: mockArticles[0]["Date of publication"],
    headline: mockArticles[0]["Title"],
    mainText: mockArticles[0].Content,
    reports: [getReportEntity()],
  };
};

export const getMockArticles = (): Article[] => {
  return [
    {
      articleId: "art-123",
      url: mockArticles[0].URL,
      dateOfPublication: mockArticles[0]["Date of publication"],
      headline: mockArticles[0]["Title"],
      mainText: mockArticles[0].Content,
      reports: [],
    },
    {
      articleId: "art-1234",
      url: mockArticles[1].URL,
      dateOfPublication: mockArticles[1]["Date of publication"],
      headline: mockArticles[1]["Title"],
      mainText: mockArticles[1].Content,
      reports: [],
    },
    {
      articleId: "art-12345",
      url: mockArticles[2].URL,
      dateOfPublication: mockArticles[2]["Date of publication"],
      headline: mockArticles[2]["Title"],
      mainText: mockArticles[2].Content,
      reports: [],
    },
  ];
};

// going with a single report per article for this atm and will have to sus how to differentiate syndromes
export const getMockReports = (): Report[] => {
  return [
    {
      reportId: "rep-123",
      diseases: ["Measles"],
      syndromes: [],
      eventDate: mockArticles[0]["Date of publication"],
      locations: ["Afghanistan"],
    },
    {
      reportId: "rep-1234",
      diseases: [mockArticles[1]["Title"].split(" - ")[0]],
      syndromes: [],
      eventDate: mockArticles[1]["Date of publication"],
      locations: [mockArticles[1]["Title"].split(" - ")[1]],
    },
    {
      reportId: "rep-12345",
      diseases: [mockArticles[2]["Title"].split(" - ")[0]],
      syndromes: [],
      eventDate: mockArticles[2]["Date of publication"],
      locations: [mockArticles[2]["Title"].split(" - ")[1]],
    },
  ];
};

export const getMockUsers = (): User[] => {
  return [
    {
      userId: "user-123",
      name: "jeff",
      email: "jeff1@gmail.com",
      bookmarkedArticles: [getArticleEntity()],
      bookmarkedCountries: [],
    },
    {
      userId: "user-321",
      name: "tom",
      email: "tom1@gmail.com",
      bookmarkedArticles: [getArticleEntity()],
      bookmarkedCountries: [],
    },
    {
      userId: "user1",
      name: "Bob",
      email: "bobthebuilder@gmail.com",
      bookmarkedArticles: [],
      bookmarkedCountries: [],
    },
  ];
};

export const getUserEntity = (): UserEntity => {
  const user = getMockUsers()[0];
  const userEntity = new UserEntity();
  userEntity.userId = user.userId;
  userEntity.name = user.name;
  //userEntity.password = user.password;
  userEntity.bookmarkedArticles = [getArticleEntity()];
  userEntity.email = user.email;
  return userEntity;
};

export const getMockAdvice = (): Advice => {
  return getMockAdviceEntities()[0];
};

export const getMockAdviceEntities = (): Advice[] => {
  return [
    {
      adviceId: "advice1",
      url: "https://www.idkwherethisgoes.com",
      continent: "North America",
      adviceLevel: "Do not Travel",
      lastUpdate: new Date(),
      latestAdvice: "abababababa",
    },
    {
      adviceId: "advice2",
      url: "https://www.idkwherethisgoes2.com",
      continent: "Pacific",
      adviceLevel: "Reconsider your need to travel",
      lastUpdate: new Date(),
      latestAdvice: "I don't think this is a valid place to travel to...",
    },
    {
      adviceId: "advice3",
      url: "https://www.idkwherethisgoes3.com",
      continent: "Fictional",
      adviceLevel: "Exercise a high degree of caution",
      lastUpdate: new Date(),
      latestAdvice: "There's a talking lion there idk",
    },
  ];
};

export const getMockCountries = (): Country[] => {
  return [
    {
      countryId: "country1",
      name: "United States of America",
      code: "US",
      coords: [30, 30],
      advice: getMockAdviceEntities()[0],
      comments: [],
    },
    {
      countryId: "country2",
      name: "Atlantis",
      code: "AT",
      coords: [31, 31],
      advice: getMockAdviceEntities()[1],
      comments: [],
    },
    {
      countryId: "country3",
      name: "Narnia",
      code: "NN",
      coords: [32, 32],
      advice: getMockAdviceEntities()[2],
      comments: [],
    },
  ];
};

export const getMockFlights = (): any[] => {
  return [
    {
      departure: "SYD",
      arrival: "BKK",
      duration: "PT9H40M",
      departureTime: "2022-11-01T10:30:00",
      arrivalTime: "2022-11-01T16:10:00",
      carrierCode: "EK",
      currency: "EUR",
      price: "460.91",
    },
    {
      departure: "SYD",
      arrival: "BKK",
      duration: "PT9H40M",
      departureTime: "2022-11-01T10:30:00",
      arrivalTime: "2022-11-01T16:10:00",
      carrierCode: "QF",
      currency: "EUR",
      price: "587.91",
    },
  ];
};

export const getMockFlightOffers = () => {
  return {
    meta: {
      count: 2,
      links: {
        self: "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2022-11-01&adults=1&nonStop=true&max=3",
      },
    },
    data: [
      {
        type: "flight-offer",
        id: "1",
        source: "GDS",
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: "2022-04-15",
        numberOfBookableSeats: 3,
        itineraries: [
          {
            duration: "PT9H40M",
            segments: [
              {
                departure: {
                  iataCode: "SYD",
                  terminal: "1",
                  at: "2022-11-01T10:30:00",
                },
                arrival: {
                  iataCode: "BKK",
                  at: "2022-11-01T16:10:00",
                },
                carrierCode: "EK",
                number: "5023",
                aircraft: {
                  code: "333",
                },
                operating: {
                  carrierCode: "QF",
                },
                duration: "PT9H40M",
                id: "1",
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: "EUR",
          total: "460.91",
          base: "389.00",
          fees: [
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "TICKETING",
            },
          ],
          grandTotal: "460.91",
        },
        pricingOptions: {
          fareType: ["PUBLISHED"],
          includedCheckedBagsOnly: true,
        },
        validatingAirlineCodes: ["EK"],
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "EUR",
              total: "460.91",
              base: "389.00",
            },
            fareDetailsBySegment: [
              {
                segmentId: "1",
                cabin: "ECONOMY",
                fareBasis: "QLEOPAU1",
                brandedFare: "ECOSAVER",
                class: "Q",
                includedCheckedBags: {
                  weight: 30,
                  weightUnit: "KG",
                },
              },
            ],
          },
        ],
      },
      {
        type: "flight-offer",
        id: "2",
        source: "GDS",
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: "2022-04-22",
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: "PT9H40M",
            segments: [
              {
                departure: {
                  iataCode: "SYD",
                  terminal: "1",
                  at: "2022-11-01T10:30:00",
                },
                arrival: {
                  iataCode: "BKK",
                  at: "2022-11-01T16:10:00",
                },
                carrierCode: "QF",
                number: "23",
                aircraft: {
                  code: "333",
                },
                operating: {
                  carrierCode: "QF",
                },
                duration: "PT9H40M",
                id: "2",
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: "EUR",
          total: "587.91",
          base: "505.00",
          fees: [
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "TICKETING",
            },
          ],
          grandTotal: "587.91",
        },
        pricingOptions: {
          fareType: ["PUBLISHED"],
          includedCheckedBagsOnly: true,
        },
        validatingAirlineCodes: ["QF"],
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "EUR",
              total: "587.91",
              base: "505.00",
            },
            fareDetailsBySegment: [
              {
                segmentId: "2",
                cabin: "ECONOMY",
                fareBasis: "SLATDO",
                class: "S",
                includedCheckedBags: {
                  weight: 30,
                  weightUnit: "KG",
                },
              },
            ],
          },
        ],
      },
    ],
    dictionaries: {
      locations: {
        BKK: {
          cityCode: "BKK",
          countryCode: "TH",
        },
        SYD: {
          cityCode: "SYD",
          countryCode: "AU",
        },
      },
      aircraft: {
        "333": "AIRBUS A330-300",
      },
      currencies: {
        EUR: "EURO",
      },
      carriers: {
        QF: "QANTAS AIRWAYS",
        EK: "EMIRATES",
      },
    },
  };
};

// Ukraine UA data
export const getMockCountryDiseases = () => {
  return {
    meta: {
      links: {
        self: "https://test.api.amadeus.com/v1/diseases/covid19-area-report?countryCode=UA",
      },
    },
    data: {
      area: {
        name: "Ukraine",
        iataCode: "UA",
        areaType: "Country",
      },
      summary:
        "<p>Health authorities confirmed the first case of COVID-19 in Chernivtsi on 3 March 2020, after a patient who had recently travelled to Italy tested positive for the virus. Most restrictions have been lifted and the country is open to international travel. Despite a fall in incidence rates, hundreds of new cases continue to be reported daily.</p>",
      diseaseRiskLevel: "Medium",
      diseaseInfection: {
        date: "2021-09-05",
        level: "Medium",
        rate: 52.9,
        infectionMapLink:
          "https://covid19.rnbo.gov.ua/?fbclid=IwAR1TXauFhOd3A9iOgaRCiZ27py5Ngz2hmDkaVuZj_7U-Oe3ejIQn34wBT9I",
      },
      diseaseCases: {
        date: "2021-06-22",
        deaths: 54220,
        confirmed: 2292295,
      },
      dataSources: {
        covidDashboardLink:
          "https://covid19.gov.ua/analitichni-paneli-dashbordy",
        healthDepartementSiteLink: "https://moz.gov.ua/koronavirus-2019-ncov",
        governmentSiteLink: "https://covid19.gov.ua/en",
      },
      areaRestrictions: [
        {
          date: "2021-09-07",
          text: "<p>On 20 February 2020, at least 10 people were detained after residents of Novi Sanzhary, Poltava oblast, blocked the Poltava-Kremenchuk highway to protest the placement of citizens repatriated from China.</p> <p>Around 2,000 Hasidic Jewish pilgrims, who sought to travel to the city of Uman, rallied at the Novi Yarylovychi checkpoint on the Ukraine-Belarus border on 14 September 2020 to demand passage to Ukraine after Ukrainian authorities refused to allow them entry during the Rosh Hashanah holiday.</p> <p>Multiple demonstrations have been held in Kyiv, Kharkiv and other urban hubs over COVID-19-related restrictions and the economic impact of the pandemic.</p>",
          restrictionType: "Demonstrations and Unrest ",
        },
        {
          date: "2021-09-07",
          text: "<p>President Volodymyr Zelensky announced on 9 November 2020 that he tested positive for COVID-19.</p> <p>On 17 December 2020, Kharkiv mayor Hennadiy Kernes died from COVID-19 complications after contracting the virus in September.</p>",
          restrictionType: "Political Developments",
        },
      ],
      areaAccessRestriction: {
        transportation: {
          date: "2021-09-12",
          text: "<p>Ukraine International Airlines (UIA) and other airlines are operating limited international flights primarily through Kyiv Boryspil International Airport (KBP/UKBB) and Kyiv International Airport (IEV/UKKK).</p>",
          transportationType: "FLIGHT",
          isBanned: "No",
        },
        declarationDocuments: {
          date: "2021-09-06",
          text: '<p>Foreign nationals must purchase health insurance that will be valid during their stay in Ukraine and cover the cost of COVID-19 treatment. Health insurance can be purchased on <a href="https://visitukraine.today/" target="_blank" rel="noopener">https://visitukraine.today/</a>.</p>',
          documentRequired: "Yes",
          healthDocumentationLink: "https://visitukraine.today/",
        },
        entry: {
          date: "2021-09-06",
          text: "<p>Foreign travellers are permitted entry with proof of a negative test result, recovery or vaccination against COVID-19. A valid health insurance is required for entry.</p>",
          ban: "No",
          rules: "https://visitukraine.today/",
          borderBan: [
            {
              borderType: "maritimeBorderBan",
              status: "Open",
            },
            {
              borderType: "landBorderBan",
              status: "Open",
            },
          ],
        },
        diseaseTesting: {
          date: "2021-09-06",
          text: "<p><strong>Before travel</strong></p><p>Unvaccinated foreign nationals - excluding permanent residency permit holders - are required to present a negative PCR or rapid antigen test that was taken within 72 hours before entry.</p><p><strong>After arrival</strong></p><p>Unvaccinated travellers must take a new COVID-19 test within 72 hours after entry to end self-quarantine.</p>",
          isRequired: "Yes",
          when: "Before travel, After arrival",
          requirement: "Mandatory",
          rules: "https://visitukraine.today/",
          testType: "PCR, Antigen",
          minimumAge: 12,
          validityPeriod: {
            delay: "P72H",
            referenceDateType: "Arrival",
          },
        },
        tracingApplication: {
          date: "2021-09-02",
          text: "<p>While Ukraine does not have a contact tracing app, unvaccinated travellers must undergo self-quarantine with the Vdoma mobile app, unless they obtain a negative test result for COVID-19 within 72 hours of arrival.</p>",
          isRequired: "No",
          iosUrl: [
            "https://apps.apple.com/us/app/%D0%B2%D0%B4%D0%BE%D0%BC%D0%B0/id1504695512",
          ],
          androidUrl: [
            "https://play.google.com/store/apps/details?id=ua.gov.diia.quarantine&hl=en_US&gl=US",
          ],
        },
        quarantineModality: {
          date: "2021-09-02",
          text: "<p>Unvaccinated travellers who arrive from or stayed in India or Russia within the past seven days must quarantine for 14 days. The quarantine period cannot be shortened.</p> <p>Unvaccinated travellers arriving from other countries must obtain a negative COVID-19 test result within 72 hours after arrival or self-quarantine for 10 days.</p>",
          eligiblePerson: "None",
          quarantineType: "Self",
          duration: 14,
          rules: "https://visitukraine.today/",
          quarantineOnArrivalAreas: [
            {
              iataCode: "IN",
              areaType: "country",
            },
            {
              iataCode: "RU",
              areaType: "country",
            },
          ],
        },
        mask: {
          date: "2021-09-13",
          text: "<p>A face mask covering the mouth and nose must be worn inside public buildings and on public transport. The requirement to wear face masks on public transport extends to airports, including Kyiv Boryspil International Airport. UIA passengers must wear face masks at the airport and on board the aircraft.</p>",
          isRequired: "Yes",
        },
        exit: {
          date: "2021-09-07",
          text: "<p>There are no special requirements to exit the country.</p>",
          specialRequirements: "No",
          isBanned: "No",
        },
        otherRestriction: {
          date: "2021-09-07",
        },
        diseaseVaccination: {
          date: "2021-09-02",
          text: '<p>Travellers with proof of full vaccination against COVID-19 are exempt from testing and quarantine. The vaccine must be approved by the World Health Organization (WHO) for emergency use.</p> <p>Ukrainian nationals who have been vaccinated in Ukraine can obtain a vaccination certificate through the Diia mobile app (<a href="https://diia.gov.ua/" target="_blank" rel="noopener">https://diia.gov.ua/</a>). The certificate will be valid for 180 days.</p>',
          isRequired: "No",
          referenceLink: "https://visitukraine.today/",
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
          exemptions: "Testing, Quarantine",
        },
      },
      areaPolicy: {
        date: "2021-09-05",
        text: "<p>Regions are colour-coded 'green', 'yellow', 'orange' or 'red' based on the level of COVID-19 risk, with 'red' regions subject to the most restrictive measures.</p> <p>The country is open to international travel.</p>",
        status: "Partial Measures",
        startDate: "2021-02-24",
        endDate: "2021-10-01",
        referenceLink: "https://visitukraine.today/",
      },
      relatedArea: [
        {
          methods: ["GET"],
          rel: "Parent",
        },
      ],
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
      type: "covid19-area-report",
    },
  };
};
