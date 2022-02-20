import { Subscription } from "src/interfaces/SubscriptionInterface";
import { v4 as uuidv4 } from "uuid";
import { onboardUser } from "./scenarios";

export enum TestScenario {
  NULL = "NULL",
  ONBOARD_USER = "ONBOARD_USER",
}

export type GeneratorOptions = {
  testScenario: TestScenario;
};

export const generateResponse = (options: GeneratorOptions): Subscription => {
  switch (options.testScenario) {
    case TestScenario.NULL:
      return onboardUser();
    case TestScenario.ONBOARD_USER:
      return onboardUser();
    default:
      return onboardUser();
  }
};

export const generateSubscription = (): string => uuidv4();
