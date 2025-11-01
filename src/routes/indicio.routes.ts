import { Router } from "express";
import {
  listarIndiciosPorExpediente,
  crearIndicio,
  actualizarIndicio,
  cambiarEstadoIndicio,
} from "../controllers/indicio.controller";
import { verificarAuth } from "../auth/auth.middleware";
import { permitirRoles } from "../auth/role.middleware";
import { validarCampos } from "../middlewares/validate.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Indicios
 *   description: Módulo de gestión de indicios vinculados a expedientes
 */

/**
 * @swagger
 * /indicios/{expediente_id}:
 *   get:
 *     summary: Lista los indicios asociados a un expediente.
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expediente_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de indicios del expediente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 */
router.get("/:expediente_id", verificarAuth, listarIndiciosPorExpediente);

/**
 * @swagger
 * /indicios:
 *   post:
 *     summary: Crea un nuevo indicio (solo técnico).
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Indicio'
 *     responses:
 *       201:
 *         description: Indicio creado correctamente.
 */
router.post(
  "/",
  verificarAuth,
  permitirRoles("Tecnico"),
  validarCampos(["id", "expediente_id", "codigo", "descripcion", "peso"]),
  crearIndicio
);

/**
 * @swagger
 * /indicios/{id}:
 *   put:
 *     summary: Actualiza los datos de un indicio.
 *     tags: [Indicios]
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
 *                 example: "Descripción actualizada del indicio."
 *               peso:
 *                 type: number
 *                 example: 2.3
 *               color:
 *                 type: string
 *                 example: "gris"
 *               tamano:
 *                 type: string
 *                 example: "mediano"
 *     responses:
 *       200:
 *         description: Indicio actualizado correctamente.
 */
router.put(
  "/:id",
  verificarAuth,
  permitirRoles("Tecnico"),
  validarCampos(["descripcion", "peso"]),
  actualizarIndicio
);

/**
 * @swagger
 * /indicios/{id}/activo:
 *   patch:
 *     summary: Activa o desactiva un indicio (solo coordinador).
 *     tags: [Indicios]
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
 *         description: Estado del indicio cambiado correctamente.
 */
router.patch(
  "/:id/activo",
  verificarAuth,
  permitirRoles("Coordinador"),
  validarCampos(["activo"]),
  cambiarEstadoIndicio
);

export default router;
