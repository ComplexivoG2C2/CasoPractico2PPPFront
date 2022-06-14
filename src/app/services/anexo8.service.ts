import { Injectable } from '@angular/core';
import {Anexo8} from "../models/anexo8";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Anexo8Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo8';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }


  saveAnexo8(anexo8: Anexo8): Observable<Anexo8> {
    //console.log(anexo4)
    return this.http.post<Anexo8>(this.urlEndPoint, anexo8, {headers: this.httpHeaders})
  }

  updateAnexo8(anexo8: Anexo8): Observable<Anexo8> {
    //console.log(anexo4)
    return this.http.put<Anexo8>(this.urlEndPoint, anexo8, {headers: this.httpHeaders})
  }

  getAnexo8All(): Observable<Anexo8[]> {
    return this.http.get(this.urlEndPoint, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }

  getAnexo8byCedula(cedula?: String): Observable<Anexo8[]> {
    return this.http.get(this.urlEndPoint + "/allByCedulaAnexo8/" + cedula, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }

  getAnexo8byProyecto(idProyecto?: number): Observable<Anexo8[]> {
    return this.http.get(this.urlEndPoint + "/allByAnexo8/" + idProyecto, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }

}
