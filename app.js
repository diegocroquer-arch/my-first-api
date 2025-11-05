import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

export function createApp() {
  const app = express();
  app.use((req, res, next) => {
    console.log("Llega un request");
    next();
  });
  app.set("view engine", "ejs");
  app.get("/", (req, res) => {
    res.json({
      message: "API de usuarios - Ejercicio 2",
      version: "2.0",
      architecture: "Routes → Repository + Model",
    });
  });
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", userRoutes);
  return app;
}
export default createApp;
