import { celebrate, Joi, Segments } from "celebrate";
class validate {
  static registration = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(6).required(),
      username: Joi.string().min(3).max(32).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(8).max(127).required(),
    }),
  });
  static questionValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(6).required(),
    }),
  });

  static updateQuestion = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(6).required(),
    }),
  });

  static createAnswer = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(6).required(),
    }),
  });
  static signIn = celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().min(3).max(320).required().email(),
      password: Joi.string().min(8).max().required(127),
    }),
  });
}

export default validate;
