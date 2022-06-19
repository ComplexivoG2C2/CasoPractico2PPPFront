import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo31} from "../models/anexo31";

@Injectable({
  providedIn: 'root'
})
export class Anexo31Service {


  private urlEndPoint: string = 'http://localhost:8080/api/anexo31';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }


  saveAnexo31(anexo31: Anexo31): Observable<Anexo31> {
    console.log(anexo31)
    return this.http.post<Anexo31>(this.urlEndPoint, anexo31, {headers: this.httpHeaders})
  }

  getAnexo31(): Observable<Anexo31[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo31[]))
  }

  getAnexo31ByidProyecto(id?: Number): Observable<Anexo31> {
    return this.http.get(this.urlEndPoint + "/allByProyecto/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo31))
  }
}
