import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo11} from "../models/anexo11";
import {Anexo7} from "../models/anexo7";

@Injectable({
  providedIn: 'root'
})
export class Anexo11Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo11';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  saveAnexo11(anexo11: Anexo11):Observable<Anexo11>{
    console.log(anexo11);
    return this.http.post<Anexo11>(this.urlEndPoint,anexo11,{headers: this.httpHeaders})
  }
  updateAnexo11(anexo11: Anexo11):Observable<Anexo11>{
    console.log(anexo11);
    return this.http.put<Anexo11>(this.urlEndPoint,anexo11,{headers: this.httpHeaders})
  }
  getAnexo11by(idproyecto:Number):Observable<Anexo11[]>{
    return this.http.get(this.urlEndPoint+"/proyecto/"+idproyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo11[]))
  }
  getAnexo11(): Observable<Anexo11[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo11[]))

  }
}
