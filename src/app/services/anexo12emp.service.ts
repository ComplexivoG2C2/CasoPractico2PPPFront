import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../models/user";
import {Anexo12} from "../models/anexo12";

@Injectable({
  providedIn: 'root'
})
export class Anexo12empService {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo12';
  private urlt: string = 'http://localhost:8080/api/auth/usuario';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["tutor"]).token
  })

  constructor(private http: HttpClient) {
  }
  getusuario(cedula:String): Observable<User> {
    return this.http.get(this.urlt +"/"+ cedula, {headers: this.httpHeaders}).pipe(map(Response => Response as User))

  }
  updateanexo12(anexo12: Anexo12): Observable<Anexo12> {
    console.log(anexo12)
    return this.http.put<Anexo12>(this.urlEndPoint, anexo12, {headers: this.httpHeaders})
  }

  getAll(): Observable<Anexo12[]> {
    return this.http.get(this.urlEndPoint+"/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo12[]))
  }
  getAnexo12byid(id?:Number):Observable<Anexo12>{
    return this.http.get(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo12))
  }

  saveAnexo12(anexo12: Anexo12): Observable<Anexo12> {
    //console.log(anexo11);
    return this.http.post<Anexo12>(this.urlEndPoint, anexo12, {headers: this.httpHeaders})
  }
  deleteAnexo12(id?: Number){
    return this.http.delete<Anexo12>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getAnexo11byidproyecto(idProyecoPPP?:number):Observable<Anexo12[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+idProyecoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo12[]))
  }
  getAnexo12biidppp(idProyecoPPP?:number):Observable<Anexo12>{
    return this.http.get(this.urlEndPoint+"/byppp/"+idProyecoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo12))
  }
}
