import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Empresa} from "../models/empresa";

@Injectable({
  providedIn: 'root'
})
//probando
export class IniciosesionService {
  private urlEndPoint:string='http://localhost:8080/api/auth';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  Login(userRequest: User):Observable<User>{
    console.log(userRequest.cedula)
    return this.http.post<User>(this.urlEndPoint+"/login",userRequest)
  }
  Signup(userRequest: User):Observable<User>{
    console.log(userRequest)
    return this.http.post<User>(this.urlEndPoint+"/signup",userRequest)
  }
  Login2(empresaRequest: Empresa):Observable<Empresa>{
    console.log(empresaRequest.emailEmpresa)
    return this.http.post<Empresa>(this.urlEndPoint+"/login2",empresaRequest)
  }
}
