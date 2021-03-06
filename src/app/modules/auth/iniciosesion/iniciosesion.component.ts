import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {IniciosesionService} from "../../../services/iniciosesion.service";

let PARAMETROS=''
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  //Angular Social Login
  socialUser!: SocialUser;
  userLogged!: SocialUser;
  issloading=true;
  //Obtiene los datos del inicio de sesión
  public userRequest: User = new User();
  //Habilita ek incio o el cierre de sesión
  habilitar: boolean = true;

  //Validaciones
  cedulaFormControl = new FormControl('', [ Validators.pattern( '[0-9]{10}'),Validators.required]);
  matcher = new MyErrorStateMatcher();
  omit_special_char(event: { charCode: any; })
  {var k;
    k = event.charCode;
    return((k >= 48 && k <= 57));
  }
  omit_max_char(event:{ target: any; })
  {var k;
    k = event.target.value.length;
    console.log(k)
    return (k <= 9);
  }
  constructor(private router: Router,private authService: SocialAuthService,private iniciosesionService: IniciosesionService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },2000)
  }
  ngOnInit(): void {
    this.authService.authState.subscribe(data =>{
      this.userLogged=data;
    })
  }
  logOut(): void{
    this.authService.signOut();
  }
  //Auth2 para el incio de sesón con google.
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.userRequest.email=data.email;
        this.userRequest.urlFoto=data.photoUrl;
        this.userRequest.rol='';
        this.iniciosesionService.Login(this.userRequest).subscribe(
          data=>{
            sessionStorage.clear;
            console.log(sessionStorage.clear+"login limpiar usuario")
            if(data.rol=="DOC"){
              Swal.fire({
                title: 'Error',
                text: 'La cédula ingresada no pertenece al Instituto Superior Tecnológico del Azuay',
                icon: 'warning',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fafaf9",
              })
            }else{
              sessionStorage.setItem('user', JSON.stringify(data));
              console.log(sessionStorage.setItem('user', JSON.stringify(data))+"login tokrn usuario")
              this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenida']);
            }
          },
          err =>{
            if(err.error.mensaje=="No existe"){
              this.setHabilitar(false);
            }
          }
        )
      }
    )
  }
  //Crea a un usario nuevo si este no existe
  public create():void{
    this.iniciosesionService.Signup(this.userRequest).subscribe(
      data => {
        sessionStorage.clear;
        console.log(sessionStorage.clear+'user sign up limpiar token')
        if(data.rol=="DOC"){
          Swal.fire({
            title: 'Error',
            text: 'La cédula ingresada no pertenece al Instituto Superior Tecnológico del Azuay',
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#ffffff",
          })
        }else{
          sessionStorage.setItem('user', JSON.stringify(data));
          console.log(data.nombrescompletos+'user sign up token'+ sessionStorage.setItem('user', JSON.stringify(data)))
          this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenida']);
        }
      },
      err=>{
        Swal.fire({
          title: 'Error',
          text: 'La cédula ingresada no pertenece al Instituto Superior Tecnológico del Azuay',
          icon: 'warning',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#ffffff",
        })
      }
    )
  }
//rama oscar
  //Metodo de ocultar y mostrar componetes.
  setHabilitar(habilitar:boolean):void{
    this.habilitar=(this.habilitar==true)? false: true;
  }
}
