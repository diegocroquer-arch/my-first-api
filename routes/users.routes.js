export default router;
import express from "express";
import {
  validateRequiredFields,
  isValidEmail,
  isValidPassword,
  handleError,
} from "../utils/validation.utils.js";
import {
  addUser,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  emailExists,
} from "../repository/users.data.js";

const router = express.Router();

router.post("/users", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos requeridos
    validateRequiredFields({ name, email, password });

    // Validar formato de email
    isValidEmail(email);

    // Validar fortaleza de contraseña
    isValidPassword(password);

    let emailExists = await emailExists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "El correo electrónico ya está registrado.",
      });
    }
    const newUser = await addUser({ name, email, password });
    if (newUser) {
      return res.status(201).json({
        id: Date.now(),
        created: new Date().toISOString(),
        success: true,
        message: "Usuario creado exitosamente.",
        data: newUser,
      });
    }
  } catch (error) {
    handleError(error, res, next);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    let users = await getAllUsers();
    let count = users.length + 1;
    let arrayModificado = users.map((objeto) => {
      const nuevoObjeto = { ...objeto };
      delete nuevoObjeto.password;
      return nuevoObjeto;
    });
    res.status(200).json({
      success: true,
      data: arrayModificado,
      count: count,
    });
  } catch (error) {
    handleError(error, res, next);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
    const { password, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    handleError(error, res, next);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    validateRequiredFields({ name, email, password });
    isValidEmail(email);
    isValidPassword(password);

    const updatedUser = await updateUserById(Id, {
      name,
      email,
      password,
    });
    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: "Usuario actualizado exitosamente.",
        data: updatedUser,
      });
    }
    emailExists(email);
  } catch (error) {
    handleError(error, res, next);
  }
});
