import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Solicitudproyecto} from "../models/solicitudproyecto";
import {Anexo4} from "../models/anexo4";

@Injectable({
  providedIn: 'root'
})
export class Anexo4Service {
  private urlEndPoint:string='http://localhost:8080/api/carreras';
  //Token cuando se entra como usuarios
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token});

  constructor(private http:HttpClient) { }

  saveAnexo4(anexo4:Anexo4):Observable<Anexo4>{
    //console.log(anexo4)
    return this.http.post<Anexo4>(this.urlEndPoint,anexo4,{headers:this.httpHeaders})
  }
  getAnexo4():Observable<Anexo4[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo4[]))

  }
  getAnexoByidProyecto(id?:Number):Observable<Anexo4>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo4))
  }
}
