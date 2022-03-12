import Joi from "@hapi/joi";

export const ReportSchema = Joi.object({
    reportId: Joi.string().required(),
})