import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {actividadeslistProyectos, Solicitudproyecto, requisitoslistProyectos} from "../models/solicitudproyecto";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {


  private urlEndPoint:string='http://localhost:8080/api/solicitudproyectos';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token})

  constructor(private http:HttpClient) { }

  getSolicitudes():Observable<Solicitudproyecto[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Solicitudproyecto[]))
  }


  updateSolicitudes(proyectos: Solicitudproyecto):Observable<Solicitudproyecto>{
    //console.log(proyectos);
    return this.http.put<Solicitudproyecto>(this.urlEndPoint+"/update",proyectos,{headers: this.httpHeaders})
  }

  deleteSolicitudes(id?: Number){
    return this.http.delete<Solicitudproyecto>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getSolicitudesbyid(id:number):Observable<Solicitudproyecto>{
    return this.http.get(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Solicitudproyecto))
  }

  updateRequistosbyIdSolicitudes(id:number,requisitoslistProyectos:requisitoslistProyectos[]):Observable<Solicitudproyecto>{
    //console.log(requisitoslistProyectos);
    return this.http.put<Solicitudproyecto>(this.urlEndPoint+"/"+id+"/requisitos",requisitoslistProyectos,{headers: this.httpHeaders})
  }

  updateActividadesbyIdSolicitudes(id:number,actividadeslistProyecto:actividadeslistProyectos[]):Observable<Solicitudproyecto>{
    //console.log(actividadeslistProyecto);
    return this.http.put<Solicitudproyecto>(this.urlEndPoint+"/"+id+"/actividades",actividadeslistProyecto,{headers: this.httpHeaders})
  }
  getSolicitudesCICedulaDirector(cedula:String):Observable<Solicitudproyecto[]>{
    return this.http.get(this.urlEndPoint+"/tutoremp/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Solicitudproyecto[]))
  }
  getSolicitudesCICedulaAp(cedula:String):Observable<Solicitudproyecto[]>{
    return this.http.get(this.urlEndPoint+"/tutoracademico/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Solicitudproyecto[]))
  }
  getSolicitudesbyCIApoyo(cedula:string):Observable<Solicitudproyecto>{
    return this.http.get(this.urlEndPoint+'/cedula/tutoracademico/'+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Solicitudproyecto))
  }


}
