import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { poolPromise } from "../db/db";

// 👥 Listar usuarios
export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_Usuarios_Listar");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al listar usuarios." });
  }
};

// ➕ Crear usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { id, nombre, email, password, rol } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", id)
      .input("nombre", nombre)
      .input("email", email)
      .input("passwordHash", passwordHash)
      .input("rol", rol)
      .execute("sp_Usuarios_Crear");

    res.status(201).json({ message: "Usuario creado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear usuario." });
  }
};
