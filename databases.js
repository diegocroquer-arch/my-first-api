import Sequelize from "sequelize";
// Configuración de la conexión a la base de datos
export const sequelize = new Sequelize("postgres", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
});
