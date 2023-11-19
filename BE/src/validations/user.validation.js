import Joi from "joi";

export const userValidation = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is not allowed to be empty',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required(),
    avatar: Joi.string(),
    role: Joi.string(),
    password: Joi.string().required().min(6).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is not allowed to be empty',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'Confirm password không được bỏ trống',
        'string.base': 'Confirm password là kiểu text',
        'any.required': 'Confirm password là bắt buộc',
        'any.only': 'Confirm password không khớp với password',
    }),
})
