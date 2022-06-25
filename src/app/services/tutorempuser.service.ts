import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TutorEmpresarial} from "../models/tutorEmpresarial";
import {map, Observable} from "rxjs";
import {Anexo2} from "../models/anexo2";
import {Anexo3} from "../models/anexo3";

@Injectable({
  providedIn: 'root'
})
export class TutorempuserService {

  private urlEndPoint: string = 'http://localhost:8080/api/tutorEmpresarial';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['user']).token
  })

  constructor(private http: HttpClient) {
  }

  saveTutores(tutorEmpresarrial: TutorEmpresarial): Observable<TutorEmpresarial> {
    console.log(tutorEmpresarrial);
    return this.http.post<TutorEmpresarial>(this.urlEndPoint + "/", tutorEmpresarrial, {headers: this.httpHeaders})
  }

  getTutoresAll(): Observable<TutorEmpresarial[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(
      data => data as TutorEmpresarial[]
    ));
  }
  gettutorbyproyecto(id?:Number):Observable<TutorEmpresarial[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as TutorEmpresarial[]))
  }

  updateDatoste(tutorEmpresarial: TutorEmpresarial): Observable<TutorEmpresarial> {
    console.log(tutorEmpresarial);
    return this.http.put<TutorEmpresarial>(this.urlEndPoint + "/actualizaridproyecto", tutorEmpresarial, {headers: this.httpHeaders})
  }
}
