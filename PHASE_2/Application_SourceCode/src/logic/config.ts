export enum AppEnv {
  DEV = "DEV",
  PROD = "PROD",
};

class AppConfig {
  public readonly apiUrl: string;

  public readonly env: AppEnv;

  constructor() {
    this.apiUrl = "http://localhost:3001/api";
    this.env = AppEnv.DEV;
  }
}

export default new AppConfig();
