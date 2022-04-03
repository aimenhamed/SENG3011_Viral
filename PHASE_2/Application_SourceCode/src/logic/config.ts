export enum AppEnv {
  DEV = "DEV",
  PROD = "PROD",
}

class AppConfig {
  public readonly apiUrl: string;

  public readonly env: AppEnv;

  constructor() {
    this.apiUrl = process.env.API_URL || "http://localhost:3030/api";
    this.env = AppEnv.DEV;
  }
}

export default new AppConfig();
