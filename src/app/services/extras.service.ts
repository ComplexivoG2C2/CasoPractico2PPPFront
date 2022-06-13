import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Codigocarrera} from "../models/codigocarrera";
import {CarreasAlumo} from "../models/anexo3";

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  private urlEndPoint:string='http://localhost:8080/api';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  getCarrera(cedula:String):Observable<CarreasAlumo>{
    return this.http.get(this.urlEndPoint+"/auth/"+cedula,{headers: this.httpHeaders}).pipe(map((Response: CarreasAlumo) => Response as CarreasAlumo))
  }
  getCarreraDocente(cedula:String):Observable<Codigocarrera[]>{
    return this.http.get(this.urlEndPoint+"/docentes/"+cedula+"/carreras",{headers: this.httpHeaders}).pipe(map(Response => Response as Codigocarrera[]))
  }

}
