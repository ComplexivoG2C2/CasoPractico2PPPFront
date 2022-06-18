import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RegistroConvenio} from "../models/registroConvenio";

@Injectable({
  providedIn: 'root'
})
export class RegistroConvenioService {
  private urlEndPoint: string = 'http://localhost:8080/api/registroconvenio';

  //Token cuando se entra como usuarios
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token})


  constructor(private http: HttpClient) { }

  saveRegistroConvenio(registroConvenio:RegistroConvenio):Observable<RegistroConvenio>{
    //console.log(anexo3_1)
    return this.http.post<RegistroConvenio>(this.urlEndPoint,RegistroConvenio,{headers:this.httpHeaders})
  }

  deleteRegistroConvenio(id?: Number){
    return this.http.delete<RegistroConvenio>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getAnexo3_1():Observable<RegistroConvenio[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as RegistroConvenio[]))
  }

  getRegistroConvenioByid(id?:Number):Observable<RegistroConvenio>{
    return this.http.get(this.urlEndPoint+"/registroId/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as RegistroConvenio))
  }

}
