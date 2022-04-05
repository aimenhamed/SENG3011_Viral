import Joi from "@hapi/joi";

export const FlightsSchema = Joi.object({
  originLocationCode: Joi.string().required(),
  destinationLocationCode: Joi.string().required(),
  departureDate: Joi.string(),
  adults: Joi.string(),
}).options({ allowUnknown: true });
