import { Request, Response } from "express";
import { poolPromise } from "../db/db";

// 📋 Listar indicios por expediente
export const listarIndiciosPorExpediente = async (req: Request, res: Response) => {
  try {
    const { expediente_id } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("expediente_id", Number(expediente_id))
      .execute("sp_Indicios_ListarPorExpediente");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al listar indicios." });
  }
};

// 🆕 Crear indicio
export const crearIndicio = async (req: Request, res: Response) => {
  try {
    const { id, expediente_id, codigo, descripcion, peso, color, tamano } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", id)
      .input("expediente_id", expediente_id)
      .input("codigo", codigo)
      .input("descripcion", descripcion)
      .input("peso", peso)
      .input("color", color)
      .input("tamano", tamano)
      .execute("sp_Indicios_Crear");

    res.status(201).json({ message: "Indicio creado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear indicio." });
  }
};

// ✏️ Actualizar indicio
export const actualizarIndicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descripcion, peso, color, tamano } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", Number(id))
      .input("descripcion", descripcion)
      .input("peso", peso)
      .input("color", color)
      .input("tamano", tamano)
      .execute("sp_Indicios_Actualizar");

    res.json({ message: "Indicio actualizado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar indicio." });
  }
};

// 🗑️ Activar / Desactivar indicio
export const cambiarEstadoIndicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", Number(id))
      .input("activo", activo)
      .execute("sp_Indicios_ActivarDesactivar");

    res.json({ message: `Indicio ${activo ? "activado" : "desactivado"} correctamente.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar estado del indicio." });
  }
};
