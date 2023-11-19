import Joi from "joi";

const signupValidation = Joi.object({
    username: Joi.string().required().min(5).max(30),
    email: Joi.string().email().required(),
    role: Joi.string(),
    password: Joi.string().required().min(6).message({
        'string.base': `"password" phải là kiểu "text"`,
        'string.empty': `"password" không được bỏ trống`,
        'string.min': `"password" phải chứa ít nhất {#limit} ký tự`,
        'any.required': `"password" là trường bắt buộc`,
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'Confirm password không được bỏ trống',
        'string.base': 'Confirm password là kiểu text',
        'any.required': 'Confirm password là bắt buộc',
        'any.only': 'Confirm password không khớp với password',
    }),
});

const signinValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `"email" phải là kiểu "text"`,
        'string.empty': `"email" không được bỏ trống`,
        'string.email': `"email" phải có định dạng là email`,
        'any.required': `"email" là trường bắt buộc`,
    }),
    password: Joi.string().required().min(6).messages({
        'string.base': `"password" phải là kiểu "text"`,
        'string.empty': `"password" không được bỏ trống`,
        'string.min': `"password" phải chứa ít nhất {#limit} ký tự`,
        'any.required': `"password" là trường bắt buộc`,
    }),
})

export { signinValidation, signupValidation }