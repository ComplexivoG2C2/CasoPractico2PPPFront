export class Anexo14{
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
  resultadoAnexo14?:String;
  promedio?:Number;
  documento?:String;
  nombretutoracademico?:String;
  cedulatutoracademico?:String;
  cedulatutoremp?:String;
  empresa?:String;
  tutoracademicoPuntaje?:Number ;
  tutoraca?:Anexo14TutorAcaRequest[];

}
export class Anexo14TutorAcaRequest{
  id?:Number;
  tutoracaItem0?:String;
  tutoracaItem1?:String;
  tutoracaItem2?:Number;
}
