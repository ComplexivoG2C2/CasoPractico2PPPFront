import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo5} from "../models/anexo5";
import {Anexo6} from "../models/anexo6";

@Injectable({
  providedIn: 'root'
})
export class Anexo5empService {

  private urlEndPoint:string='http://localhost:8080/api/anexo5';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["emp"]).token})

  constructor( private http:HttpClient) { }

  saveAnexo5(anexo5:Anexo5):Observable<Anexo5>{
    return this.http.post<Anexo5>(this.urlEndPoint, anexo5,{headers: this.httpHeaders} )
  }

  getAnexo5All():Observable<Anexo5[]>{
    return this.http.get(this.urlEndPoint+"/all", {headers: this.httpHeaders}).pipe(map(Response=> Response as Anexo5[]))
  }

  getAnexo5byId(id?:Number):Observable<Anexo5>{
    return this.http.get(this.urlEndPoint+"/"+id, {headers: this.httpHeaders}).pipe(map(Response=> Response as Anexo5))
  }

  getAnexo5bynombre(nomreTutoremp:String):Observable<Anexo5[]>{
    return this.http.get(this.urlEndPoint+'/pornombre/'+nomreTutoremp,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo5[]))

  }
  getAnexo5byidempresa(idEmpresa:Number):Observable<Anexo5[]>{
    return this.http.get(this.urlEndPoint+'/poridempresa/'+idEmpresa,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo5[]))

  }

}
