export interface AmadeusResponse {
  data: AmadeusData;
}

export interface AmadeusData {
  area: {
    name: string;
  };
  summary: string;
  diseaseRiskLevel: string;
  diseaseInfection: {
    date: string;
    level: string;
  };
  diseaseCases: {
    date: string;
    deaths: number;
    confirmed: number;
  };
  hotspots: string;
  areaAccessRestriction: {
    transportation: {
      date: string;
      text: string;
      transporationType: string;
      isBanned: string;
      throughDate: string;
    };
    quarantineModality: {
      date: string;
      text: string;
      rules: string;
    };
    mask: {
      date: string;
      text: string;
      isRequired: string;
    };
    exit: {
      date: string;
      text: string;
      isBanned: string;
    };
    diseaseVaccination: {
      date: string;
      isRequired: string;
      acceptedCertificates: string[];
      qualifiedVaccines: string[];
      policy: string;
    };
  };
  areaVaccinated: [
    {
      date: string;
      vaccinationDoseStatus: string;
      percentage: number;
    }
  ];
}

export interface AmadeusFlightResponse {
  data: AmadeusFlightData[];
}

export interface AmadeusFlightData {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogenous: boolean;
  oneWay: boolean;
  lastTicketingDate: Date;
  numberOfBookableSeats: number;
  itineraries: [
    {
      duration: string;
      segments: [
        {
          departure: {
            iataCode: string;
            termial: string;
            at: string;
          };
          arrival: {
            iataCode: string;
            terminal: string;
            at: string;
          };
          carrierCode: string;
          number: string;
          aircraft: {
            code: string;
          };
          operating: {
            carrierCode: string;
          };
          duration: string;
          id: string;
          numberOfStops: number;
          blacklistedInEU: boolean;
        }
      ];
    }
  ];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: [
      {
        amount: string;
        type: string;
      }
    ];
    grandTotal: string;
  };
  pricingOptions: {
    fareType: [string];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: [string];
  travelerPricings: [
    {
      travelerId: string;
      fareOption: string;
      travelerType: string;
      price: {
        currency: string;
        total: string;
        base: string;
      };
      fareDetailsBySegment: [
        {
          segmentId: string;
          cabin: string;
          fareBasis: string;
          class: string;
          includedCheckedBags: {
            weight: number;
            weightUnit: string;
          };
        }
      ];
    }
  ];
}
