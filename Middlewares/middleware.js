import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  console.log("Middleware solo para /admin");
  next();
});
router.get("/dashboard", (req, res) => {
  res.json({ message: "Bienvenido" });
});
app.use("/admin", router);
