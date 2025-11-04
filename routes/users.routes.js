import express from "express";
import jwt from "jsonwebtoken";
import {
  validateRequiredFields,
  isValidEmail,
  isValidPassword,
  emailExists,
} from "../utils/validation.utils.js";
import {
  addUser,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../repository/users.data.js";

const userRouter = express.Router();

// Crear usuario
userRouter.post("/", async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    //    validateRequiredFields(req.body, ["nombre", "correo", "contrasena"]);

    // 3️⃣ Verificar si el correo ya existe
    //const correoExiste = await emailExists(correo);
    // if (correoExiste) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "El correo electrónico ya está registrado.",
    //   });
    // }
    console.log("aqui");
    // 4️⃣ Crear usuario
    const newUser = await addUser(nombre, correo, contrasena);

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al crear usuario", error });
  }
});

// Obtener todos los usuarios
userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    const arrayModificado = users.map(({ id, nombre, correo }) => ({
      id,
      nombre,
      correo,
    }));

    res.status(200).json({
      success: true,
      count: users.length,
      data: arrayModificado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener usuarios", error });
  }
});

// Obtener usuario por ID
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    const { contrasena, ...userSinContrasena } = user;
    res.status(200).json({ success: true, data: userSinContrasena });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al buscar usuario", error });
  }
});

// Actualizar usuario
userRouter.put("/:id", async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    validateRequiredFields(req.body, ["nombre", "correo", "contrasena"]);
    isValidEmail(correo);
    isValidPassword(contrasena);

    const updatedUser = await updateUserById(req.params.id, {
      nombre,
      correo,
      contrasena,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente.",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar usuario", error });
  }
});

// Eliminar usuario
userRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);
    if (deletedUser) {
      return res.status(400).json({
        success: false,
        message: "Usuario no eliminado.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuario eliminado exitosamente.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar usuario", error });
  }
});

export default userRouter;
