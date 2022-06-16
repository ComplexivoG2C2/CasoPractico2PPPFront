import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Empresa} from "../models/empresa";
import {map, Observable} from "rxjs";
import {tutorEmpresarial} from "../models/tutorEmpresarial";
import {Docentes} from "../models/docentes";

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresarialService {


  private urlEndPoint: string = 'http://localhost:8080/api/tutorEmpresarial';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(sessionStorage['emp']).token})

  constructor(private http: HttpClient) {
  }


  saveTutor(tutor:tutorEmpresarial):Observable<tutorEmpresarial>{
    console.log(tutor);
    console.log(this.httpHeaders)
    return this.http.post<tutorEmpresarial>(this.urlEndPoint,tutor,{headers: this.httpHeaders})
  }

  getTutoresAll():Observable<tutorEmpresarial[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as tutorEmpresarial[]
    ));
  }
}
