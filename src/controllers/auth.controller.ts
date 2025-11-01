import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { poolPromise } from "../db/db";
import { generarToken } from "../auth/jwt.utils";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", email)
      .execute("sp_Usuarios_Login");

    const usuario = result.recordset[0];
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, usuario.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generarToken({ id: usuario.id, rol: usuario.rol });
    res.json({ token, usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
