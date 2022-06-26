import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistroConvenio} from "../models/registroConvenio";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrocconvenioempService {
  private urlEndPoint: string = 'http://localhost:8080/api/registroconvenio';

  //Token cuando se entra como usuarios
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(sessionStorage["emp"]).token})


  constructor(private http: HttpClient) { }

  saveRegistroConvenio(registroConvenio:RegistroConvenio):Observable<RegistroConvenio>{
    console.log(registroConvenio)
    return this.http.post<RegistroConvenio>(this.urlEndPoint,registroConvenio,{headers:this.httpHeaders})
  }

  deleteRegistroConvenio(id?: Number){
    return this.http.delete<RegistroConvenio>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getRegistroConvenio():Observable<RegistroConvenio[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as RegistroConvenio[]))
  }

  getRegistroConvenioByid(id?:Number):Observable<RegistroConvenio>{
    return this.http.get(this.urlEndPoint+"/registroId/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as RegistroConvenio))
  }

  updateregistro(regitroconvenio:RegistroConvenio): Observable<RegistroConvenio> {
    console.log(regitroconvenio);
    return this.http.put<RegistroConvenio>(this.urlEndPoint,regitroconvenio, {headers: this.httpHeaders})
  }


}
