import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Solicitudproyecto} from "../models/solicitudproyecto";
import {Anexo8_1} from "../models/Anexo8_1";
import {Anexo3_1} from "../models/anexo3_1";

@Injectable({
  providedIn: 'root'
})
export class Anexo81Service {
  private urlEndPoint:string='http://localhost:8080/api/carreras';
  //Token cuando se entra como usuarios
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token});

  constructor(private http:HttpClient) {}

  saveAnexo8_1(anexo8_1:Anexo8_1):Observable<Anexo8_1>{
    //console.log(anexo8_1)
    return this.http.post<Anexo8_1>(this.urlEndPoint,anexo8_1,{headers:this.httpHeaders})
  }
  updateAnexo8_1(anexo8_1:Anexo8_1):Observable<Anexo8_1>{
    return this.http.put<Anexo8_1>(this.urlEndPoint,anexo8_1,{headers:this.httpHeaders})
  }

  getAnexo8_1():Observable<Anexo8_1[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8_1[]))

  }
  getAnexoByidProyecto(id?:Number):Observable<Anexo8_1>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8_1))
  }

  deleteAnexo8_1(id?: Number){
    return this.http.delete<Solicitudproyecto>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  }
