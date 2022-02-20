import { Subscription } from "src/interfaces/SubscriptionInterface";
import { generateSubscription } from "./generator";

export const onboardUser = (): Subscription => {
  const subscription = generateSubscription();
  return {
    status: "SUCCESS",
    statusMessage: "Subscription was retrieved successfully",
    subscriptionId: subscription,
  };
};
