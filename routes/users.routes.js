import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validateRequiredFields,
  isValidEmail,
  isValidPassword,
} from "../utils/validation.utils.js";
import {
  addUser,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  emailExists,
  findUserByEmail,
} from "../repository/users.data.js";
import { Usuario } from "../models/usermodel.js";
import e from "express";

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
// to do: devuelve el usuario y varias caracteristicas extrañas
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

// Obtener usuario por correo
userRouter.get("/email/:correo", async (req, res) => {
  try {
    const { correo } = req.params;
    const user = await findUserByEmail(correo);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    const { contrasena, ...userSinContrasena } = user;
    res.status(200).json({ success: true, data: userSinContrasena });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar usuario por correo",
      error: error.message,
    });
  }
});

// to do: Actualizar usuario
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

// Registro de usuario
userRouter.post("/register", async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const passwordHash = await bcrypt.hash(contrasena, 10);
  await addUser(nombre, correo, passwordHash);
  await res.status(201).json({ message: "Usuario creado" });
});

//to do: hacer roles de usuario
userRouter.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;
  const user = await findUserByEmail(correo);

  console.log(user);

  if (!user) return res.status(400).json({ message: "asuhdiaushdlidas" });
  const passwordOk = await bcrypt.compare(contrasena, user.contrasena);

  console.log("Contraseña almacenada:", user.contrasena);
  if (!passwordOk)
    return res.status(400).json({ message: "Credenciales inválidas" });

  const token = jwt.sign({ correo }, "72y3i47hy234i92736y4i34786238", {
    expiresIn: "1h",
  });

  res.json({ token });
});

export default userRouter;
