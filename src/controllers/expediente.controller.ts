import { Request, Response } from "express";
import { poolPromise } from "../db/db";

// 📋 Listar expedientes
export const listarExpedientes = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_Expedientes_Listar");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al listar expedientes." });
  }
};

// 🆕 Crear expediente
export const crearExpediente = async (req: Request, res: Response) => {
  try {
    const { id, codigo, descripcion } = req.body;
    const tecnico_id = req.user?.id;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", id)
      .input("codigo", codigo)
      .input("descripcion", descripcion)
      .input("tecnico_id", tecnico_id)
      .execute("sp_Expedientes_Crear");

    res.status(201).json({ message: "Expediente creado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear expediente." });
  }
};

// ✏️ Actualizar expediente
export const actualizarExpediente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", Number(id))
      .input("descripcion", descripcion)
      .execute("sp_Expedientes_Actualizar");

    res.json({ message: "Expediente actualizado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar expediente." });
  }
};

// 🔄 Cambiar estado (aprobado/rechazado)
export const cambiarEstadoExpediente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado, justificacion } = req.body;
    const aprobador_id = req.user?.id;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", Number(id))
      .input("estado", estado)
      .input("justificacion", justificacion)
      .input("aprobador_id", aprobador_id)
      .execute("sp_Expedientes_CambiarEstado");

    res.json({ message: "Estado de expediente actualizado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar estado del expediente." });
  }
};

// 🗑️ Activar/Desactivar expediente
export const cambiarActivoExpediente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .input("id", Number(id))
      .input("activo", activo)
      .execute("sp_Expedientes_ActivarDesactivar");

    res.json({
      message: `Expediente ${activo ? "activado" : "desactivado"} correctamente.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar estado activo del expediente." });
  }
};
