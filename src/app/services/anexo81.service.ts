import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo81} from "../models/anexo81";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Anexo81Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo81';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })
  constructor(private http:HttpClient) {}

  saveAnexo81(anexo81:Anexo81):Observable<Anexo81>{
    console.log(anexo81)
    return this.http.post<Anexo81>(this.urlEndPoint,anexo81,{headers:this.httpHeaders})
  }
  updateAnexo81(anexo81:Anexo81):Observable<Anexo81>{
    return this.http.put<Anexo81>(this.urlEndPoint,anexo81,{headers:this.httpHeaders})
  }

  getAnexo81():Observable<Anexo81[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo81[]))

  }
  getAnexoByidProyecto(id?:Number):Observable<Anexo81>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo81))
  }

  deleteAnexo81(id?: Number){
    return this.http.delete<Anexo81>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
