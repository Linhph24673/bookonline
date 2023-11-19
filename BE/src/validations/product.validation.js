import Joi from "joi";

const productValidation = Joi.object({
    // id: Joi.string(),
    name: Joi.string().required().min(5),
    price: Joi.number().required(),
    author: Joi.string().required(), // tác giả
    publishing: Joi.string().required(), // nhà xuất bản
    quantity: Joi.number().required(),
    categoryId: Joi.string().required(),
    images: Joi
        .array()
        .items(
            Joi
                .object({
                    url: Joi.string(),
                    publicId: Joi.string(),
                    filename: Joi.string(),
                })
                .unknown(true)
        )
        .min(1),
    description: Joi.string(),
    is_deleted: Joi.boolean().default(false),
    is_active: Joi.boolean().default(true),
})

export default productValidation