export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash?: string;
  rol: "Tecnico" | "Coordinador";
  activo: boolean;
  fechaCreacion?: Date;
}
