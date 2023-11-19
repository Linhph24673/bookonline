import Joi from "joi";

export const cartValidation = new Joi.object({
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            count: Joi.number().required(),
            price: Joi.number().required()
        })
    ),
    cartTotal: Joi.number().required(),
    totalAfterDiscount: Joi.number().required(),
    orderBy: Joi.string().required()
})