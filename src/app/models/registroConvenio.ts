export class RegistroConvenio {
  id?:Number
  codigoInforme?:String;
  anioInforme?:String;
  fechaConvenio?:Date;
  nombreEmpresa?:String;
  naturalezaEntidad?:String;
  nombreRepreEmpresa?:String;
  rucEmpresa?:String;

  actividadEconomicaRuc?:ActividadEconomicaRuc[];

  anioConvenio?:Number;
  nroEstudiantes?:Number;
  totalEstudiantes?:Number;
  nombreTutorAcademico?:String;
  tlfTutorA?:String;
  nombreTutorEmpresa?:String;
  cargoTutorEmpresa?:String;
  tlfTutorEmpresa?:String;
  emailEmpresa?:String;
  tlfContactoEmpresa?:String;
  provinciaMatrizEmpresa?:String;
  cantonMatrizEmpresa?:String;
  callePrincipalEmpresa?:String;
  numIdetificacionEdificio?:String;
  calleSecundariaMatrizEmpresa?:String;
  referenciaEmpresa?:String;
  provinciaSucursalEmpresa?:String;
  cantonSucursalEmpresa?:String;
  direccionSucursalEmpresa?:String;
  carrera?:String;
  cargoAdminConvenioIsta?:String;
  cargoRepreEmpresa?:String;
  justificacionEmpresa?:String;
  nombreRectorIsta?:String;
  fechaNombramiento?:Date;

  actividadesRealizars?:ActividadesRealizar[];

  nroTutoresEmpresa?:Number;
  conclusionesConvenio?:String;
  recomendacionesConvenio?:String;
  nombreAdminConvenio?:String;
  empresa_id?:Number;
  documento?:String;
  num_proceso?:Number;

}

export class ActividadEconomicaRuc {
  id?:Number;
  codActividad?:String;
  actividades?:String;
}

export class ActividadesRealizar {
  id?:Number;
  actividadesRealizar?:String;
}

