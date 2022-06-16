import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TutorEmpresarial} from "../models/tutorEmpresarial";
import {map, Observable} from "rxjs";
import {Solicitudproyecto} from "../models/solicitudproyecto";

@Injectable({
  providedIn: 'root'
})
export class TutempresarialService {

  private urlEndPoint: string = 'http://localhost:8080/api/tutorEmpresarial';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer ' + JSON.parse(sessionStorage['emp']).token})

  constructor(private http: HttpClient) {
  }

  saveTutores(tutorEmpresarrial: TutorEmpresarial): Observable<TutorEmpresarial> {
    console.log(tutorEmpresarrial);
    return this.http.post<TutorEmpresarial>(this.urlEndPoint + "/save", tutorEmpresarrial, {headers: this.httpHeaders})
  }
  getTutoresAll():Observable<TutorEmpresarial[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as TutorEmpresarial[]
    ));
  }
}
