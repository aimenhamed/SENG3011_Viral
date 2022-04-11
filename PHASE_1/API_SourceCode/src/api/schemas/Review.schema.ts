import Joi from "@hapi/joi";

export const ReviewPostSchema = Joi.object({
  countryId: Joi.string().required(),
  userId: Joi.string(), // drop and use token instead
  rating: Joi.number().required(),
  title: Joi.string().required(),
  mainText: Joi.string().required(),
}).options({ allowUnknown: true });
