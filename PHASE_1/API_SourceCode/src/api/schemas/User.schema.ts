import Joi from "@hapi/joi";

export const UserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserBookmarkArticleSchema = Joi.object({
  userId: Joi.string().required(),
  articleId: Joi.string().required(),
});

export const UserDashboardSchema = Joi.object({
  userId: Joi.string().required(),
  dashboardId: Joi.string().required(),
});
