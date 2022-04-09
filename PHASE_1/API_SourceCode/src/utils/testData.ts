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
