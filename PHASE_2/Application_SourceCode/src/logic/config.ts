export enum AppEnv {
  DEV = "DEV",
  PROD = "PROD",
}

class AppConfig {
  public readonly apiUrl: string;

  public readonly env: AppEnv;

  constructor() {
    this.apiUrl = "https://teamviral-api.herokuapp.com/api";
    this.env = AppEnv.DEV;
  }
}

export default new AppConfig();
