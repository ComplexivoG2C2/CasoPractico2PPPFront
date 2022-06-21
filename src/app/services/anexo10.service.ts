import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo10} from "../models/anexo10";

@Injectable({
  providedIn: 'root'
})
export class Anexo10Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo10';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }


  saveAnexo10(anexo10: Anexo10): Observable<Anexo10> {
    console.log(anexo10)
    return this.http.post<Anexo10>(this.urlEndPoint, anexo10, {headers: this.httpHeaders})
  }

  getAnexo10(): Observable<Anexo10[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo10[]))

  }

  getAnexo10ByidProyecto(id?: Number): Observable<Anexo10> {
    return this.http.get(this.urlEndPoint + "/allByProyecto/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo10))
  }
  getAnexo10_porid(id:Number):Observable<Anexo10>{
    return this.http.get(this.urlEndPoint+"/allById/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo10))
  }

  deleteAnexo10(id?: Number) {
    return this.http.delete<Anexo10>(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
  }
}
