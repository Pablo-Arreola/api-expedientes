import sql from "mssql";
import { env } from "../config/env";

const dbConfig: sql.config = {
  user: env.dbUser,
  password: env.dbPassword,
  server: env.dbServer,
  database: env.dbName,
  port: env.dbPort,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool: sql.ConnectionPool) => {
    console.log(`✅ Conectado a SQL Server: ${env.dbServer}`);
    return pool;
  })
  .catch((err: Error) => {
    console.error("❌ Error al conectar a SQL Server:", err);
    throw err;
  });
