import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo6} from "../models/anexo6";
import {map, Observable} from "rxjs";
import {Solicitudproyecto} from "../models/solicitudproyecto";
import {DocenteApoyoDatos} from "../models/docentes";

@Injectable({
  providedIn: 'root'
})
export class Anexo6Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo6';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  saveAnexo6(anexo6: Anexo6):Observable<Anexo6>{
    //console.log(anexo5);
    return this.http.post<Anexo6>(this.urlEndPoint,anexo6,{headers: this.httpHeaders})
  }

  updateAnexo6(anexo6: Anexo6):Observable<Anexo6>{
    // console.log(anexo5);
    return this.http.put<Anexo6>(this.urlEndPoint,anexo6,{headers: this.httpHeaders})
  }
  getAnexo6All():Observable<Anexo6[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6[]))

  }
  getAnexo6byId(id?:Number):Observable<Anexo6>{
    return this.http.get(this.urlEndPoint+'/'+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6))

  }
  getAnexo6byCedula(cedula:String):Observable<Anexo6[]>{
    return this.http.get('http://localhost:8080/api/anexo6/docenteApoyo/'+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6[]))

  }
  getDocentesApoyo(cedulaEstudiante?:String,idProyectoPPP?:Number):Observable<DocenteApoyoDatos>{
    return this.http.get(this.urlEndPoint+ '/estudiante/'+cedulaEstudiante+'/proyecto/'+idProyectoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as DocenteApoyoDatos))
  }
  deleteAnexo6(id?: Number){
    return this.http.delete<Solicitudproyecto>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
