import Joi from "@hapi/joi";

export const ReportSchema = Joi.object({
  report_id: Joi.string().required(),
});
