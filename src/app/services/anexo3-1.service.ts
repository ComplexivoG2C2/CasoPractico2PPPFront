import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Solicitudproyecto} from "../models/solicitudproyecto";
import {Anexo3_1} from "../models/anexo3_1";
import {Anexo2} from "../models/anexo2";

@Injectable({
  providedIn: 'root'
})
export class Anexo31Service {
  private urlEndPoint:string='http://localhost:8080/api/carreras';
  //Token cuando se entra como usuarios
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token});

  constructor(private http:HttpClient) { }

  saveAnexo3_1(anexo3_1:Anexo3_1):Observable<Anexo3_1>{
    //console.log(anexo3_1)
    return this.http.post<Anexo3_1>(this.urlEndPoint,anexo3_1,{headers:this.httpHeaders})
  }
  updateAnexo3_1(anexo3_1:Anexo3_1):Observable<Anexo3_1>{
    //console.log(anexo3_1)
    return this.http.put<Anexo3_1>(this.urlEndPoint,anexo3_1,{headers:this.httpHeaders})
  }
  getAnexo3_1():Observable<Anexo3_1[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3_1[]))

  }
  getAnexoByidProyecto(id?:Number):Observable<Anexo3_1>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3_1))
  }

  deleteAnexo3_1(id?: Number){
    return this.http.delete<Solicitudproyecto>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
