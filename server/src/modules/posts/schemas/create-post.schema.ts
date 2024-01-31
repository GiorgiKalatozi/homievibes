import * as Joi from 'joi';

const titleSchema = Joi.string().min(3).max(100).required().messages({
  'string.base': 'Title must be a string',
  'string.min': 'Title must be at least 3 characters long',
  'string.max': 'Title must not exceed 100 characters',
  'any.required': 'Title is required',
});

const contentSchema = Joi.string().min(10).required().messages({
  'string.base': 'Content must be a string',
  'string.min': 'Content must be at least 10 characters long',
  'any.required': 'Content is required',
});

export const createPostSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
});
