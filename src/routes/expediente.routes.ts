import { Router } from "express";
import {
  listarExpedientes,
  crearExpediente,
  actualizarExpediente,
  cambiarEstadoExpediente,
  cambiarActivoExpediente,
} from "../controllers/expediente.controller";
import { verificarAuth } from "../auth/auth.middleware";
import { permitirRoles } from "../auth/role.middleware";
import { validarCampos } from "../middlewares/validate.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Expedientes
 *   description: Módulo de gestión de expedientes
 */

/**
 * @swagger
 * /expedientes:
 *   get:
 *     summary: Lista todos los expedientes activos.
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de expedientes.
 */
router.get("/", verificarAuth, listarExpedientes);

/**
 * @swagger
 * /expedientes:
 *   post:
 *     summary: Crea un nuevo expediente (solo técnico).
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expediente'
 *     responses:
 *       201:
 *         description: Expediente creado correctamente.
 */
router.post(
  "/",
  verificarAuth,
  permitirRoles("Tecnico"),
  validarCampos(["id", "codigo", "descripcion"]),
  crearExpediente
);

/**
 * @swagger
 * /expedientes/{id}:
 *   put:
 *     summary: Actualiza un expediente existente.
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Expediente actualizado por el técnico."
 *     responses:
 *       200:
 *         description: Expediente actualizado correctamente.
 */
router.put(
  "/:id",
  verificarAuth,
  permitirRoles("Tecnico"),
  validarCampos(["descripcion"]),
  actualizarExpediente
);

/**
 * @swagger
 * /expedientes/{id}/estado:
 *   patch:
 *     summary: Cambia el estado de un expediente (solo coordinador).
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [estado, justificacion]
 *             properties:
 *               estado:
 *                 type: string
 *                 example: "aprobado"
 *               justificacion:
 *                 type: string
 *                 example: "Verificado por el coordinador."
 *     responses:
 *       200:
 *         description: Estado del expediente actualizado.
 */
router.patch(
  "/:id/estado",
  verificarAuth,
  permitirRoles("Coordinador"),
  validarCampos(["estado", "justificacion"]),
  cambiarEstadoExpediente
);

/**
 * @swagger
 * /expedientes/{id}/activo:
 *   patch:
 *     summary: Activa o desactiva un expediente (soft delete).
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activo:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Estado activo del expediente cambiado correctamente.
 */
router.patch(
  "/:id/activo",
  verificarAuth,
  permitirRoles("Coordinador"),
  validarCampos(["activo"]),
  cambiarActivoExpediente
);

export default router;
