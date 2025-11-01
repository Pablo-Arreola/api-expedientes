import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { setupSwagger } from "./swagger";

const app = express();


setupSwagger(app);

app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api", routes);

// Middleware de manejo de errores global
app.use(errorHandler);

export default app;
