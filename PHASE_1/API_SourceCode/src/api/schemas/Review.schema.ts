import Joi from "@hapi/joi";

export const ReviewPostSchema = Joi.object({
  countryId: Joi.string()
    .uuid({ version: ["uuidv4"]})
    .required(),
  userId: Joi.string()
    .uuid({ version: ["uuidv4"]})
    .required(),
  rating: Joi.number().required(),
  title: Joi.string().required(),
  mainText: Joi.string().required(),
}).options({ allowUnknown: true });

export const ReviewUpvoteSchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  reviewId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  status: Joi.boolean().required(),
});

export const ReviewDeleteSchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  reviewId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
});
