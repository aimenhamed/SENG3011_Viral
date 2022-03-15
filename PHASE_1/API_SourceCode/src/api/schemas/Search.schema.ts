import Joi from "@hapi/joi";

export const SearchSchema = Joi.object({
  period_of_interest: Joi.string().required(),
  location: Joi.string().required(),
  key_terms: Joi.string().required(),
}).options({ allowUnknown: true });
