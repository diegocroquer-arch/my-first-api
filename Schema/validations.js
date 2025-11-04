import Joi from "joi";

export const usuarioSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  nombre: Joi.string().min(2).max(100).required(),
  correo: Joi.string().email().required(),
  contrasena: Joi.string().min(6).required(),
});

export const emailSchema = Joi.object({
  correo: Joi.string().email().required(),
});

export const passwordSchema = Joi.object({
  contrasena: Joi.string().min(6).required(),
});
