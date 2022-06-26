import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo121} from "../models/anexo121";

@Injectable({
  providedIn: 'root'
})
export class Anexo121Service {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo121';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }
  updateanexo121(anexo121: Anexo121): Observable<Anexo121> {
    console.log(anexo121)
    return this.http.put<Anexo121>(this.urlEndPoint, anexo121, {headers: this.httpHeaders})
  }

  getAll(): Observable<Anexo121[]> {
    return this.http.get(this.urlEndPoint+"/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo121[]))
  }
  getAnexo121byid(id?:Number):Observable<Anexo121>{
    return this.http.get(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo121))
  }

  saveAnexo121(anexo12: Anexo121): Observable<Anexo121> {
    //console.log(anexo11);
    return this.http.post<Anexo121>(this.urlEndPoint, anexo12, {headers: this.httpHeaders})
  }
  deleteAnexo121(id?: Number){
    return this.http.delete<Anexo121>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getAnexo121byidproyecto(idProyecoPPP?:number):Observable<Anexo121[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+idProyecoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo121[]))
  }
}
