// app.js
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.routes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "API de Usuarios funcionando correctamente 🚀",
      endpoints: {},
    });
  });

  app.use(usersRouter);

  return app;
}
