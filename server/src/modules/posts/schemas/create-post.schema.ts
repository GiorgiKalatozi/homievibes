import * as Joi from 'joi';

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  userId: Joi.string().uuid().required(),
});
