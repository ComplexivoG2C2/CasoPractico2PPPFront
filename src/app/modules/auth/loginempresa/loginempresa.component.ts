import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Empresa} from "../../../models/empresa";
import {IniciosesionService} from "../../../services/iniciosesion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-loginempresa',
  templateUrl: './loginempresa.component.html',
  styleUrls: ['./loginempresa.component.css']
})
export class LoginempresaComponent implements OnInit {

  isLinear = true;
  loginForm!: FormGroup;
  issloading=true;
  empre:Empresa= new Empresa();
  email?:String;
//Obtiene los datos del inicio de sesión
  public empresaRequest: Empresa = new Empresa();
  //Habilita ek incio o el cierre de sesión
  habilitar: boolean = true;
  constructor(private iniciosesionService: IniciosesionService, private activatedRoute: ActivatedRoute,
              private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.loginForm= this._formBuilder.group({
      emailEmpresa:['', Validators.required],
      clave:['', Validators.required],
    });
  }

  login2(empre:Empresa) {
    this.iniciosesionService.Login2(this.empre).subscribe(data => {
        sessionStorage.setItem('empre', JSON.stringify(data));
        console.log(data+'lllllllllllllll')
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
