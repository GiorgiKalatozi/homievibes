import * as Joi from 'joi';

const emailSchema = Joi.string().email().required().messages({
  'string.base': 'Email must be a string',
  'string.email': 'Please enter a valid email address',
  'any.required': 'Email is required',
});

const usernameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .messages({
    'string.base': 'Username must be a string',
    'string.alphanum': 'Username must only contain alphanumeric characters',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must not exceed 30 characters',
    'any.required': 'Username is required',
  });

const passwordSchema = Joi.string().min(8).required().messages({
  'string.base': 'Password must be a string',
  'string.min': 'Password must be at least 8 characters long',
  'any.required': 'Password is required',
});

export const signUpSchema = Joi.object({
  password: passwordSchema,
  username: usernameSchema,
  email: emailSchema,
});
