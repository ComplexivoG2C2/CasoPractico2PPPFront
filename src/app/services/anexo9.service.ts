import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo9} from "../models/anexo9";
import {map, Observable} from "rxjs";
import {Empresa} from "../models/empresa";
import {TutorempresarialNombres} from "../models/tutorempresarialNombres";


@Injectable({
  providedIn: 'root'
})
export class Anexo9Service {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo9';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }
  updateActivadades(anexo9: Anexo9):Observable<Anexo9>{
    //console.log(anexo8);
    return this.http.put<Anexo9>(this.urlEndPoint,anexo9,{headers: this.httpHeaders})
  }
  deteledActivadades(idAnexo?: Number,idactividad?:Number){
    return this.http.delete<Anexo9>(this.urlEndPoint+'/'+idAnexo+"/actividad/"+idactividad,{headers: this.httpHeaders})
  }
  getEntidadById(id?:Number):Observable<Empresa>{
    return this.http.get("http://localhost:8080/api/entidad/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Empresa))
  }
  getAnexo9byCedula(cedula:String):Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/alumno/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))
  }

  getAll():Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))
  }
  saveAnexo9(anexo9: Anexo9):Observable<Anexo9>{
    console.log(anexo9);
    return this.http.post<Anexo9>(this.urlEndPoint,anexo9,{headers: this.httpHeaders})
  }
  getDocentedirector(codigoProyecto?:Number):Observable<TutorempresarialNombres>{
    return this.http.get("http://localhost:8080/api/docentes/director/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as TutorempresarialNombres))
  }
  getanexo9byproyecto(idProyectoPPP?:number):Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+idProyectoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))
  }
}
