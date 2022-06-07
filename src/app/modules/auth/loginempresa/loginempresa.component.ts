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
  empresa:Empresa= new Empresa();
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

  login2(empresa:Empresa) {
    this.iniciosesionService.Login2(this.empresa).subscribe(data => {
        sessionStorage.setItem('user', JSON.stringify(data));
        console.log(data)
        this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenidaempresa']);
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


      // Swal.fire({
      //   title: 'Custom animation with Animate.css',
      //   showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      //   },
      //   hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      //   }
      // })
      //
      }
    )

  }



  irsignup():void{
    this.router.navigate(['/auth/signup']);
  }

}
