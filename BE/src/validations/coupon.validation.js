import joi from 'joi';

export const CouponValidation = joi.object({
    code: joi.string().min(5).max(20),
    desc: joi.string().required(),
    quantity: joi.number().required(),
    sale: joi.number().required(),
    startDate: joi.date().default(Date.now),
    endDate: joi.date().default(Date.now + 7),
    isActive: joi.boolean().default(true),
});
