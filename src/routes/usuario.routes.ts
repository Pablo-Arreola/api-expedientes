import { Router } from "express";
import { listarUsuarios, crearUsuario } from "../controllers/usuario.controller";
import { verificarAuth } from "../auth/auth.middleware";
import { permitirRoles } from "../auth/role.middleware";
import { validarCampos } from "../middlewares/validate.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Módulo de administración de usuarios del sistema
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios activos (solo coordinador).
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios activos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get("/", verificarAuth, permitirRoles("Coordinador"), listarUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario (solo coordinador).
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, nombre, email, password, rol]
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 3
 *               nombre:
 *                 type: string
 *                 example: "Nuevo Técnico"
 *               email:
 *                 type: string
 *                 example: "nuevo.tecnico@umg.edu.gt"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               rol:
 *                 type: string
 *                 enum: [Tecnico, Coordinador]
 *                 example: "Tecnico"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 */
router.post(
  "/",
  verificarAuth,
  permitirRoles("Coordinador"),
  validarCampos(["id", "nombre", "email", "password", "rol"]),
  crearUsuario
);

export default router;
