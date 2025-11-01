import { Router } from "express";
import authRoutes from "./auth.routes";
import expedienteRoutes from "./expediente.routes";
import indicioRoutes from "./indicio.routes";
import usuarioRoutes from "./usuario.routes";

const router = Router();
router.use("/usuarios", usuarioRoutes);
router.use("/auth", authRoutes);
router.use("/expedientes", expedienteRoutes);
router.use("/indicios", indicioRoutes);

export default router;
