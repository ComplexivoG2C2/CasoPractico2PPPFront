export class Anexo121{
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
  promedio?:Number;
  documento?:String;
  nombretutoremp?:String;
  cedulatutoremp?:String;
  empresa?:String;
  tutorempPuntaje?:Number ;
  actividades?:ActividadesAnexo121Request[];
  responsableppp?:String;

}
export class ActividadesAnexo121Request{
  descripcion?:String;
}

