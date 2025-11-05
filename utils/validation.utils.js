import { Sequelize } from "sequelize";
import Joi from "joi";

export async function isValidUser(user) {
  const userSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    nombre: Joi.string().min(2).max(100).required(),
    correo: Joi.string().email().required(),
    contrasena: Joi.string().min(6).required(),
  });
  return userSchema.validate(user);
}

export async function isValidEmail(email) {
  const emailSchema = Joi.string().email(); // error 404 bad request no encontrado
  return emailSchema.validate(email);
}

export async function isValidPassword(password) {
  const passwordSchema = Joi.string()
    .min(6)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    );
  return passwordSchema.validate(password);
}
export function validateRequiredFields(user) {
  const { name, email, password } = user;
  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }
  return passwordSchema.validate(password);
}
