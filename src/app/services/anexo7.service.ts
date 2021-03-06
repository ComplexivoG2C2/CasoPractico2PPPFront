import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo7} from "../models/anexo7";
import {Solicitudproyecto} from "../models/solicitudproyecto";

@Injectable({
  providedIn: 'root'
})
export class Anexo7Service {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo7';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }


  saveAnexo7(anexo7: Anexo7): Observable<Anexo7> {
    console.log(anexo7)
    return this.http.post<Anexo7>(this.urlEndPoint, anexo7, {headers: this.httpHeaders})
  }

  getAnexo7(): Observable<Anexo7[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7[]))

  }
  updateanexo7(anexo7: Anexo7): Observable<Anexo7> {
    console.log(anexo7);
    return this.http.put<Anexo7>(this.urlEndPoint, anexo7, {headers: this.httpHeaders})
  }

  getAnexo7ByidProyecto7(id?: Number): Observable<Anexo7[]> {
    return this.http.get(this.urlEndPoint + "/allByProyecto/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7[]))
  }
  getAnexo7ByidProyecto(id?: Number): Observable<Anexo7> {
    return this.http.get(this.urlEndPoint + "/allByProyecto/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7))
  }
  deleteAnexo7(id?: Number){
    return this.http.delete<Anexo7>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getanexo7byid7(id:number):Observable<Anexo7>{
    return this.http.get(this.urlEndPoint+"/listarporid/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7))
  }
}
