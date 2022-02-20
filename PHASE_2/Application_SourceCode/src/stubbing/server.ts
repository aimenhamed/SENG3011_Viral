import { createServer, Model } from "miragejs";
import { generateResponse, GeneratorOptions, TestScenario } from "./generator";
import AppConfig from "../logic/config";

// Response Generator Options
// Change testScenario depending on your use case
const options: GeneratorOptions = {
  testScenario: TestScenario.ONBOARD_USER,
};

export function makeServer ({ environment = "test" } = {}) {
  const mockServer = createServer({
    environment,
    logging: true,
    timing: 2000,

    models: {
      clientId: Model,
    },

    seeds(server) {
      if (options.testScenario !== TestScenario.NULL) {
        server.create("clientId", {
          // @ts-ignore
          clientId: "sample-id",
          app: {
            ...generateResponse(options),
          },
        });
      }
    },

    routes() {
      this.urlPrefix = `${AppConfig.apiUrl}`;
      this.passthrough();

      // Subscription
      this.get("/v1/subscription/", () => {
        return {
          ...generateResponse(options),
        };
      });
    },
  });

  return mockServer;
}
