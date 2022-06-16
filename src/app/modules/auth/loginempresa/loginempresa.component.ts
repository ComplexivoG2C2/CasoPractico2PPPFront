import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Empresa} from "../../../models/empresa";
import {IniciosesionService} from "../../../services/iniciosesion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tutorEmpresarial} from "../../../models/tutorEmpresarial";

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
  public tutorRequest: tutorEmpresarial = new tutorEmpresarial();
  //Habilita ek incio o el cierre de sesión
  habilitar: boolean = true;
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

  login2(emp:Empresa) {
    this.iniciosesionService.Login2(this.empresaRequest).subscribe(
      data => {
        sessionStorage.clear;
        console.log(sessionStorage.clear+"limpiar 1 empresa")
        sessionStorage.setItem('emp', JSON.stringify(data));
        sessionStorage.setItem('id', JSON.stringify(data.id))
        sessionStorage.setItem('nombre', JSON.stringify(data.nombre))
        console.log(data.emailEmpresa+'empresa login token'+sessionStorage.setItem('emp', JSON.stringify(data)))
        this.router.navigate(['/panelempresa/gestionpracticasppp/bienvenidaempresa']);

      }, err => {
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
