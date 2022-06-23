import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../models/user";
import {Anexo14} from "../models/anexo14";

@Injectable({
  providedIn: 'root'
})
export class Anexo14Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo14';
  private urlt: string = 'http://localhost:8080/api/auth/usuario';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }
  getusuario(cedula:String): Observable<User> {
    return this.http.get(this.urlt +"/"+ cedula, {headers: this.httpHeaders}).pipe(map(Response => Response as User))

  }
  updateanexo14(anexo14: Anexo14): Observable<Anexo14> {
    console.log(anexo14)
    return this.http.put<Anexo14>(this.urlEndPoint, anexo14, {headers: this.httpHeaders})
  }

  getAll(): Observable<Anexo14[]> {
    return this.http.get(this.urlEndPoint+"/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo14[]))
  }
  getAnexo14byid(id?:Number):Observable<Anexo14>{
    return this.http.get(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo14))
  }

  saveAnexo14(anexo14: Anexo14): Observable<Anexo14> {
    console.log(anexo14);
    return this.http.post<Anexo14>(this.urlEndPoint, anexo14, {headers: this.httpHeaders})
  }
  deleteAnexo14(id?: Number){
    return this.http.delete<Anexo14>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getAnexo11byidproyecto(idProyecoPPP?:number):Observable<Anexo14[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+idProyecoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo14[]))
  }
}
