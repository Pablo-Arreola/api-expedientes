import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  id: number;
  rol: string;
}

export const generarToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "8h" });
};

export const verificarToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};
