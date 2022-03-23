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
