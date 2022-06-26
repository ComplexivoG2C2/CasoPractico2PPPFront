export class Anexo4 {
  id?:Number;
  fechaRespuesta?:Date;
  nombreRepresentanteEmp?:String;
  nombreResponsable?:String;
  cargoEmpresa?:String;
  nombreEmpresa?:String;
  fechaSolicitudEmp?:Date;
  documento?:String;
  idProyectoPPP?:Number;
  num_proceso?:Number;
  carrera?:String;
  listaEstudiantes?:ListaEstudiantesAnexo4Request[];
}

export class ListaEstudiantesAnexo4Request {
  id?:Number;
  cedula?:String;
  nombre?:String;
  estado?:String;
}
