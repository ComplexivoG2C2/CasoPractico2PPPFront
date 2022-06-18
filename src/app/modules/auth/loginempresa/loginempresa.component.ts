import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Empresa} from "../../../models/empresa";
import {IniciosesionService} from "../../../services/iniciosesion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TutorEmpresarial} from "../../../models/tutorEmpresarial";

@Component({
  selector: 'app-loginempresa',
  templateUrl: './loginempresa.component.html',
  styleUrls: ['./loginempresa.component.css']
})
export class LoginempresaComponent implements OnInit {

  isLinear = true;
  loginForm!: FormGroup;
  issloading=true;
  email?:String;
//Obtiene los datos del inicio de sesión
  public empresaRequest: Empresa = new Empresa();
  public tutorRequest: TutorEmpresarial = new TutorEmpresarial();
  //Habilita ek incio o el cierre de sesión
  habilitar: boolean = true;

  tipo: boolean = false;
  constructor(private iniciosesionService: IniciosesionService, private activatedRoute: ActivatedRoute,
              private router: Router, private _formBuilder: FormBuilder) {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },2000)
  }
  ngOnInit(): void {
    this.loginForm= this._formBuilder.group({
      emailEmpresa:['', Validators.required],
      clave:['', Validators.required],
    });
  }

  rol(){
    if(this.tipo == false){

    }
  }

  login2(emp:Empresa) {
    this.iniciosesionService.Login2(this.empresaRequest).subscribe(
      data => {
        sessionStorage.clear;
        console.log(sessionStorage.clear+"limpiar 1 empresa")
        sessionStorage.setItem('emp', JSON.stringify(data));
        console.log(data.emailEmpresa+'empresa login token'+sessionStorage.setItem('emp', JSON.stringify(data)))
        this.router.navigate(['/panelempresa/gestionpracticasppp/bienvenidaempresa']);
      }, err => {
        // this.login3()
        Swal.fire({
          title: 'Email o constraseña incorrectos',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    )
  }

  login3(tut:TutorEmpresarial) {
    console.log(this.tutorRequest.correo)
    console.log(this.tutorRequest)
    this.iniciosesionService.Login3(this.tutorRequest).subscribe(
      data => {
        sessionStorage.clear;
        console.log(sessionStorage.clear+"limpiar 1 empresa")
        sessionStorage.setItem('tut', JSON.stringify(data));
        console.log(data.correo+'empresa login token'+sessionStorage.setItem('emp', JSON.stringify(data)))
        this.router.navigate(['/panelempresa/gestionpracticasppp/bienvenidaempresa']);

      }, err => {
        console.log(err)
        Swal.fire({
          title: 'Email o constraseña incorrectos',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    )
  }
}
