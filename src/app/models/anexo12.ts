export class Anexo12{
  id?:Number;
  idProyecto?:Number;
  nombresEstudiante?:String;
  cedulaEstudiante?:String;
  carrera?:String;
  siglascarrera?:String;
  fechaInicio?:Date;
  fechaFinaliza?:Date;
  fechaEvaluacion?:Date;
  totalHoras?:Number;
  nombreApoyo?:String;
  nombreDirector?:String;
  resultadoAnexo12?:String;
  promedio?:Number;
  documento?:String;
  nombretutoremp?:String;
  cedulatutoremp?:String;
  empresa?:String;
  tutorempPuntaje?:Number ;
  tutoremp?:Anexo12TutorempRequest[];

}
export class Anexo12TutorempRequest{
  id?:Number;
  tutorempItem0?:String;
  tutorempItem1?:String;
  tutorempItem2?:Number;
}

