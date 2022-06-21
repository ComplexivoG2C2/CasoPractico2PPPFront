export class Anexo10 {
  id?:Number;
  carrera?:String;
  siglascarrera?:String;
  cedulaTutorAcademico?:String;
  nombreEstudiante?:String;
  nombreEmpresa?:String;
  tutorAcademico?:String;
  idProyectoPPP?:Number;
  codigoAnexo?:String;
  documento?:String;
  num_proceso?:Number;
  cronogramaAnexo10s?:CronogramaAnexo10Request[]=[];
}

export class CronogramaAnexo10Request {
id?:Number;
nro?:Number;
fechaSeguimiento?:Date;
actividades?:String;
fechaFinPrevista?:String;
porcentajeAvance?:Number;
observaciones?:String;
}
