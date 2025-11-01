import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "3000",
  dbServer: process.env.DB_SERVER || "PABLOPC",
  dbUser: process.env.DB_USER || "sa",
  dbPassword: process.env.DB_PASSWORD || "Admin1234",
  dbName: process.env.DB_NAME || "db_expedientes",
  dbPort: Number(process.env.DB_PORT) || 1433,
  jwtSecret: process.env.JWT_SECRET || "clave_secreta_segura"
};
