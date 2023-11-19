import Joi from 'joi';

export const categoryValidation = new Joi.object({
    // id: Joi.string(),
    name: Joi.string().required().messages({
        'string.base': 'Tên phải alf dạng chuỗi',
        'string.empty': 'Tên không được bỏ trống',
        'string.min': `Tên phải có ít nhất  {#limit} kí tự`,
        'any.required': 'Tên là bắt buộc',
    }),
});
