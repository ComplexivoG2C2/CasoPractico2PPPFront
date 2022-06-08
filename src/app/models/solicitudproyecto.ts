export class Solicitudproyecto {
  id?:number;
  particpantes?:Number;
  codigo?:string;
  nombre?:string;
  lineaaccion?:string;
  codigocarrera?:string;
  carrera?:string;
  estado?:boolean;
  fechaat?:string;
  empresa?:number;
  nombreresponsable?:string
  nombretutoremp?:String;
  responsablePPP?:Number;
  documento?:String;
  programaVinculacion?:String;
  coordinadorCedula?:String;
  plazoEjecucion?:String;
  fechaInicio?:Date;
  fechaFin?:Date;
  actividadeslistProyectos?: actividadeslistProyectos[];
  docentesDelegados?:DocentesDelegados[];
  objetivosEspecificosProyecto?:ObjetivosEspeciicoslistProyecto[]
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
export class ObjetivosEspeciicoslistProyecto{
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
