export class Solicitudproyecto {
  id?:number;
  participantes?:Number;
  codigo?:string;
  nombre?:string;
  lineaaccion?:string;
  codigocarrera?:string;
  carrera?:String;
  estado?:boolean;
  fechaat?:string;
  empresa?:Number;
  //DE PRACTICAS
  nombreresponsable?:String
  nombretutoremp?:String;
  responsablePPP?:Number;

  //responsable de la convocatoria
  nombreremp?:String;
  documento?:String;
  programaVinculacion?:String;
  coordinadorCedula?:String;
  plazoEjecucion?:String;
  fechaInicio?:Date;
  fechaFin?:Date;
  actividadeslistProyectos?: actividadeslistProyectos[];
  docentesDelegados?:DocentesDelegados[];
  actividadesEmpresaProyecto?:ActividadesEmpresalistProyecto[]
  ///
  requisitoslistProyectos?:  requisitoslistProyectos[];
  docenteApoyoResponse?:DocenteApoyoResponse[];
}

export class actividadeslistProyectos {
  descripcion?: string;
}

export class requisitoslistProyectos {
  descripcion?: string;
}
export class ActividadesEmpresalistProyecto{
  descripcion?: String;
}
export class DocenteApoyoResponse{
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
