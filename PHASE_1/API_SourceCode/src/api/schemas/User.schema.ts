import Joi from "@hapi/joi";

export const UserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserBookmarkArticleSchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  articleId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  status: Joi.boolean().required(),
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserBookmarkCountrySchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  countryId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  status: Joi.boolean().required(),
});

export const UserUpdateSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string(),
});
