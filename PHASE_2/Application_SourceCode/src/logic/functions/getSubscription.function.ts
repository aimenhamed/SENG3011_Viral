import { ApiError } from "src/interfaces/ResponseInterface";
import { Subscription } from "src/interfaces/SubscriptionInterface";
import AppConfig from "../config";
import { get } from "../createRequest";

export const getSubscription = async (): Promise<Subscription | ApiError> =>
  get(`${AppConfig.apiUrl}/v1/subscription/`) as Promise<Subscription>;
