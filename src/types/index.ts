export interface User {
  idUsuario: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefonoPersonal: string;
  documento?: string;
  tipoDocumento: string;
  testActual: string;
  motivo?: string;
  ayudaPsicologica: number;
  tratDatos: boolean;
  historial?: any;
  flujo: string;
  sesion: number;
  estado: boolean;
  practicanteAsignado?: string;
  disponibilidad: any;
}

export interface Practitioner {
  idPracticante: string;
  numero_documento: string;
  tipo_documento: string;
  nombre: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
  horario: any;
  sesiones: number;
}

export interface ConsultingRoom {
  idConsultorio: string;
  nombre: string;
  activo: boolean;
}

export interface Appointment {
  idCita: string;
  idConsultorio: string;
  idUsuario: string;
  idPracticante: string;
  fechaHora: string;
  estado: string;
  consultorio?: ConsultingRoom;
  usuario?: User;
  practicante?: Practitioner;
}