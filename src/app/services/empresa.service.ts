import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Empresa} from "../models/empresa";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private urlEndPoint:string='http://localhost:8080/api/empresa';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['emp']).token})

  constructor(private http:HttpClient) { }

  saveEmpresa(empresa:Empresa):Observable<Empresa>{
    console.log(empresa);
    return this.http.post<Empresa>(this.urlEndPoint,empresa,{headers: this.httpHeaders})
  }
  getEmpresaAll():Observable<Empresa[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as Empresa[]
    ));
  }
  getsaveEmpresabyNombre(nombre?:String){
    return this.http.get<Empresa>(this.urlEndPoint+"/all/"+nombre,{headers: this.httpHeaders}).pipe(map(data=>data as Empresa[]))
  }
  updateEmpresa(empresa:Empresa){
    console.log(empresa);
    return this.http.put<Empresa>(this.urlEndPoint,empresa,{headers: this.httpHeaders})
  }
  deleteEmpresa(id:Number){
    console.log(id)
    return this.http.delete<Empresa>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
  getsaveEmpresabyId(id:Number):Observable<Empresa>{
    return this.http.get<Empresa>(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(data=>data as Empresa))
  }
}
