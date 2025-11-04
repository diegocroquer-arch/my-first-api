import { Usuario } from "../models/usermodel.js";
import { Sequelize } from "sequelize";

export async function addUser(nombre, correo, contrasena) {
  try {
    const newUser = await Usuario.create({ nombre, correo, contrasena });
    return newUser;
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw error;
  }
}

export async function getAllUsers() {
  const usuarios = await Usuario.findAll();
  return usuarios;
}

export async function findUserById(id) {
  const user = await Usuario.findByPk(id);
  return user;
}
export async function emailExists(email) {
  const user = await Usuario.findOne({ where: { email: email } });
  return user !== null;
}

export async function updateUserById(id, userData) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    console.log(users[userIndex]);
  }
}

export async function deleteUserById(reqId) {
  await Usuario.destroy({ where: { id: reqId } });
}
