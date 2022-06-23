export class Solicitudproyecto {


  ////

  id?:number;
  participantes?:Number;
  codigo?:string;
  nombre?:string;
  cargosolicitante?:string;
  nombresolicitante?:string;
  nombreempresa?:string;
  codigocarrera?:string;
  carrera?:string;
  estado?:boolean;
  fechaat?:Date;
  empresa?:number;
  nombreresponsable?:string
  nombretutoremp?:String;
  responsablePPP?:Number;
  documento?:String;
  nombreTutoremp?:String;
  cedulaTutoremp?:String;
  tituloTutoremp?:String;

  coordinadorCedula?:String;
  plazoEjecucion?:String;
  fechaInicio?:Date;
  fechaFin?:Date;
  actividadeslistProyectos?: actividadeslistProyectos[];
  docentesDelegados?:DocentesDelegados[];
  actividadesEmpresaProyecto?:ActividadesEmpresalistProyecto[];
  ///
  requisitoslistProyectos?:  requisitoslistProyectos[];
  tutorAcademicoResponse?:TutorAcademicoResponse[];

}

export class actividadeslistProyectos {
  id?:number;
  descripcion?: string;
}

export class requisitoslistProyectos {
  id?:number;
  descripcion?: string;
}
export class ActividadesEmpresalistProyecto{
  id?:number;
  descripcion?: string;
}
export class TutorAcademicoResponse{
  cedula?:String;
  nombres?:String;
  correo?:String;
}

export class listproyect{
  id?:number;
  carrera?:String;
  nombre?:String;
  nombreresponsable?:String;
}

export class DocentesDelegados{
  cedula?:String;
  cargo?:String;
  estado?:boolean;
}
