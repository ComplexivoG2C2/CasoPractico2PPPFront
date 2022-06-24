import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo15} from "../models/anexo15";

@Injectable({
  providedIn: 'root'
})
export class Anexo15Service {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo15';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }


  saveAnexo15(anexo15: Anexo15): Observable<Anexo15> {
    console.log(anexo15)
    return this.http.post<Anexo15>(this.urlEndPoint, anexo15, {headers: this.httpHeaders})
  }

  getAnexo15(): Observable<Anexo15[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo15[]))

  }

  getAnexo15ByidProyecto(id?: Number): Observable<Anexo15> {
    return this.http.get(this.urlEndPoint + "/allByProyecto/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo15))
  }
  deleteAnexo15(id?: Number){
    return this.http.delete<Anexo15>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getanexo15byid15(id:number):Observable<Anexo15>{
    return this.http.get(this.urlEndPoint+"/Allbyid/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo15))
  }
}
