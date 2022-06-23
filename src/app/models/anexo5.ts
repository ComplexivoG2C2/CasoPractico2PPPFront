export class Anexo5{
  id?:Number;
  fechaRespuesta?:Date;
  tituloTutor?:String;
  documento?:String;
  idProyectoPPP?:Number;
  idEmpresa?:Number;
  listaEstudiantes?:ListaEstudiantesAnexo5Request[];
  responsablePPP?:string;
  carrera?:String;
  nombreTutor?:String;
  cedulaTutor?:String;
  nombreEst?:String;
  cedulaEst?:String;
  siglascarrera?:String;
}

export class ListaEstudiantesAnexo5Request{
  id?:Number;
  cedula?:String;
  nombre?:String;
}
