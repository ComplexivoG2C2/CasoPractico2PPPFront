export class Anexo7{
id?:Number
fechaReunion?:Date;
nombreResponsable?:String;
carrera?:String;
siglascarrera?:String;
tituloTutorEmp?:String;
nombreTutorEmp?:String;
nombreEmpresa?:String;
lugarReunion?:String;
cortesia?:String;
nombreEstudiante?:String;
cedulaEstudiante?:String;
cedulaTutoracademico?:String;
nombreTutoracademico?:String;
ciclo?:String;
horasCumplidas?:Number;
Fechainicio?:String;
Fechafin?:Date;
horasInicio?:String;
horasFin?:String;
horasTotales?:Number;
idProyectoPPP?:Number;
codigoAnexo?:String;
documento?:String;
num_proceso?:Number;
actividadesAnexo7s?:ActividadesAnexo7Request[]=[];
actividadesCumplirAnexo7s?:ActividadesCumplirAnexo7Request[]=[];
cronogramaActividadesAnexo7s?:CronogramaActividadesAnexo7Request[]=[];

}

export class ActividadesAnexo7Request{
  id?:Number;
 descripcion?:String;
}
export class ActividadesCumplirAnexo7Request{
  id?:Number;
  area?:String;
  actividadRealizar?:String;
  asignaturaRelacionada?:String;
}

export class CronogramaActividadesAnexo7Request{
  id?:Number;
  actividadRealizar?:String;
  semanas?:Number;
  nrohoras?:Number;
  horasTotales?:Number;
}
