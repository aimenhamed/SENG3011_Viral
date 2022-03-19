import Joi from "@hapi/joi";

export const UserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserLoginSchema = Joi.object({
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
});

export const UserDashboardSchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  dashboardId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
});
