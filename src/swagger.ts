import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Gestión de Expedientes e Indicios",
        version: "1.0.0",
        description:
          "API REST desarrollada en TypeScript + Express con autenticación JWT y roles (Técnico, Coordinador). Proyecto académico UMG 2025.",
      },
      servers: [{ url: "http://localhost:3000/api" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Usuario: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              nombre: { type: "string", example: "Carlos Pérez" },
              email: { type: "string", example: "tecnico@umg.edu.gt" },
              rol: {
                type: "string",
                enum: ["Tecnico", "Coordinador"],
                example: "Tecnico",
              },
              activo: { type: "boolean", example: true },
              fechaCreacion: { type: "string", example: "2025-10-31T10:00:00Z" },
            },
          },

          Expediente: {
            type: "object",
            properties: {
              id: { type: "integer", example: 101 },
              codigo: { type: "string", example: "EXP-2025-001" },
              descripcion: {
                type: "string",
                example: "Expediente de prueba con indicios asociados.",
              },
              tecnico_id: { type: "integer", example: 1 },
              estado: {
                type: "string",
                enum: ["pendiente", "aprobado", "rechazado"],
                example: "pendiente",
              },
              justificacion: {
                type: "string",
                example: "A la espera de revisión del coordinador.",
              },
              aprobador_id: { type: "integer", example: 2 },
              fecha_estado: { type: "string", example: "2025-10-31T12:00:00Z" },
              activo: { type: "boolean", example: true },
              fechaCreacion: { type: "string", example: "2025-10-30T08:00:00Z" },
            },
          },

          Indicio: {
            type: "object",
            properties: {
              id: { type: "integer", example: 501 },
              expediente_id: { type: "integer", example: 101 },
              codigo: { type: "string", example: "IND-001" },
              descripcion: {
                type: "string",
                example: "Huella digital en el objeto recolectado.",
              },
              peso: { type: "number", example: 2.5 },
              color: { type: "string", example: "gris" },
              tamano: { type: "string", example: "mediano" },
              activo: { type: "boolean", example: true },
              fechaCreacion: { type: "string", example: "2025-10-30T08:00:00Z" },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },

    // 👇 Busca automáticamente todas las rutas documentadas
    apis: ["./src/routes/*.ts"],
  };

  const specs = swaggerJsdoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
