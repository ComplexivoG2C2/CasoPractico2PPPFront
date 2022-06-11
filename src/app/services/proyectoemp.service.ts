import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {actividadeslistProyectos, Solicitudproyecto} from "../models/solicitudproyecto";

@Injectable({
  providedIn: 'root'
})
export class ProyectoempService {

  //Token cuando se entra como empresa

  private urlEndPoint: string = 'http://localhost:8080/api/solicitudproyectos';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer ' + JSON.parse(sessionStorage['emp']).token})

  constructor(private http: HttpClient) {
  }

  saveSolicitudes(proyectos: Solicitudproyecto): Observable<Solicitudproyecto> {
    //console.log(proyectos);
    return this.http.post<Solicitudproyecto>(this.urlEndPoint + "/save", proyectos, {headers: this.httpHeaders})
  }
}
