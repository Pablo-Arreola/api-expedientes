import { Request, Response, NextFunction } from "express";

export const validarCampos = (campos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const campo of campos) {
      if (!req.body[campo]) {
        return res
          .status(400)
          .json({ message: `El campo '${campo}' es obligatorio.` });
      }
    }
    next();
  };
};
