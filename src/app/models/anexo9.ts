export class Anexo9{
  id?:Number;
  nombreProyecto?:String;
  nombreEntidadBeneficiaria?:String;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
  nombreAdminEB?:String;
  nombreDocenteApoyo?:String;
  nombreDirectorProyecto?:String;
  idProyectoPPP?:Number;
  documento?:String;
  totalHoras?:Number;
  cedulaDirector?:String;
  actividades?:ActividadesAnexo9Request[]

}

export class ActividadesAnexo9Request{
  id?:Number;
  fecha?:Date;
  descripcionActividad?:String;
  lugar?:String;
  numHoras?:Number;
}
