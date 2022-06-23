import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Empresa} from "../models/empresa";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmpresaempService {
  private urlEndPoint: string = 'http://localhost:8080/api/empresa';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['emp']).token
  })

  constructor(private http: HttpClient) {
  }

  getEmpresaAll(): Observable<Empresa[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(
      data => data as Empresa[]
    ));
  }
}
