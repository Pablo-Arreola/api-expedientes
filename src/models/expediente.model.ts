export interface Expediente {
  id: number;
  codigo: string;
  descripcion: string;
  tecnico_id: number;
  estado: "pendiente" | "aprobado" | "rechazado";
  justificacion?: string;
  aprobador_id?: number;
  fecha_estado?: Date;
  activo: boolean;
  fechaCreacion?: Date;
}
