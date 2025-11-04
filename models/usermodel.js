import { Sequelize } from "sequelize";
import { sequelize } from "../databases.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
