import Joi from "@hapi/joi";

export const CommentPostSchema = Joi.object({
  countryId: Joi.string().required(),
  message: Joi.string().required(),
  userId: Joi.string(), // drop and use token instead
}).options({ allowUnknown: true });
