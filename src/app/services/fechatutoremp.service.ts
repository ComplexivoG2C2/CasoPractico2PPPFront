import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Fecha} from "../models/fecha";

@Injectable({
  providedIn: 'root'
})
export class FechatutorempService {


  private urlEndPoint: string = 'http://localhost:8080/api/fecha';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['tutor']).token
  })

  // private token_e = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['emp']).token})

  constructor(private http: HttpClient) {
  }

  getSysdate(): Observable<Fecha> {
    return this.http.get(this.urlEndPoint, {headers: this.httpHeaders}).pipe(map(
      data => data as Fecha
    ));
  }
}
