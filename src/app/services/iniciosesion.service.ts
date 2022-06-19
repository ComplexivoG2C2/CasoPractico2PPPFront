import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Empresa} from "../models/empresa";
import {TutorEmpresarial} from "../models/tutorEmpresarial";

@Injectable({
  providedIn: 'root'
})
//probando
export class IniciosesionService {
  private urlEndPoint:string='http://localhost:8080/api/auth';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  Login(userRequest: User):Observable<User>{
    console.log(userRequest)
    return this.http.post<User>(this.urlEndPoint+"/login",userRequest)
  }
  Signup(userRequest: User):Observable<User>{
    console.log(userRequest)
    return this.http.post<User>(this.urlEndPoint+"/signup",userRequest)
  }
  Login2(empresaRequest: Empresa):Observable<Empresa>{
    console.log('email'+empresaRequest.emailEmpresa)
    console.log("nombre"+empresaRequest.nombre)
    return this.http.post<Empresa>(this.urlEndPoint+"/login2",empresaRequest)
  }
  Login3(tutorRequest: TutorEmpresarial):Observable<TutorEmpresarial>{
    console.log('email'+tutorRequest.correo)
    console.log(tutorRequest.clave)
    console.log("nombre"+tutorRequest.nombres)
    return this.http.post<TutorEmpresarial>(this.urlEndPoint+"/logintutor",tutorRequest)
  }
}
