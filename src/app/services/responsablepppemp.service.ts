import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CarreraDocente, Docentes} from "../models/docentes";

@Injectable({
  providedIn: 'root'
})
export class ResponsablepppempService {
  //Token cuando se entra como empresa

  private urlEndPoint: string = 'http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(sessionStorage['emp']).token})

  constructor(private http: HttpClient) {
  }

  getResposablepppbyCarrera(codigoCarrera: String): Observable<Docentes> {
    console.log(codigoCarrera)
    return this.http.get(this.urlEndPoint + "/responsable/" + codigoCarrera, {headers: this.httpHeaders}).pipe(map(Response => Response as Docentes))
  }
}
