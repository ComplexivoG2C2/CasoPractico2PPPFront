export class Anexo9{
  id?:Number;
  nombreProyecto?:String;
  nombreEmpresa?:String;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
  nombreRepresentanteemp?:String;
  nombreTutorAcademico?:String;
  nombreTutoremp?:String;
  idProyectoPPP?:Number;
  documento?:String;
  totalHoras?:Number;
  cedulaTutoremp?:String;
  actividades?:ActividadesAnexo9Request[]

}

export class ActividadesAnexo9Request{
  id?:Number;
  fecha?:Date;
  descripcionActividad?:String;
  horallegada?:String;
  horasalida?:String;
  numHoras?:Number;
}
