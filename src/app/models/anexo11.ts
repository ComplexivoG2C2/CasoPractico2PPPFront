export class Anexo11{
  id?:Number;
  nombreDirectorDocenteApoyo?:String
  cedulaDirectorDocenteApoyo?:String
  periodoAcademicon?:String
  empresa?:String
  representanteLegal?:String
  ciclo?:String
  nombreest?:String;
  carrera?:String
  nombretutoremp?:String;
  cedulaetutoremp?:String;
  siglascarrera?:String;
  cedulaest?:String;
  observaciones?:String
  documento?:String
  proyectoId?:Number;
  estudiantesVisitas?:EstudiantesVisitaRequest[]
  informes?:ListVisitaRequest[]
  num_proceso?:Number;
}
export class EstudiantesVisitaRequest{
  id?:Number;
  cedula?:String;
  nombre?:String;
}
export class ListVisitaRequest{
  id?:Number;
  asunto?:String;
  actividades?:String;
  observaciones?:String;
  horaInicio?:String;
  horaFin?:String;
  fecha?:Date;
}
