import { Component, OnInit } from '@angular/core';
import {Empresa} from "../../models/empresa";
import {Router} from "@angular/router";
import {TutorEmpresarial} from "../../models/tutorEmpresarial";

@Component({
  selector: 'app-tutorempre',
  templateUrl: './tutorempre.component.html',
  styleUrls: ['./tutorempre.component.css']
})
export class TutorempreComponent implements OnInit {


  public correo?:string;
  //Estado de barra lateral visible/no visible
  panelOpenState = false;
  //Para almacenar los datos de usuario el inciar session
  tutorEmpresarial:TutorEmpresarial=new TutorEmpresarial();
  //Obtine el nombre completo de rol correspondiente

  //Maneja el estado de carga de esta pagina
  issloading=true;


  constructor(private router:Router) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }
  ngOnInit(): void {

    if (JSON.parse(sessionStorage['tutor']) != "") {
      //Obtine los datos el de incio de sesion con el JSON
      this.tutorEmpresarial=JSON.parse(sessionStorage['tutor']);
      this.correo=JSON.parse(sessionStorage['tutor']).correo
      sessionStorage.clear;
    } else {
      sessionStorage.clear;
      localStorage.removeItem("tutor");
      sessionStorage.setItem('tutor', JSON.stringify(""));
      this.router.navigate(['auth/inicio_sesion']).then(() => {
        window.location.reload();
      });
    }

  }


  logout():void{
    sessionStorage.clear;
    console.log("salir tutor "+sessionStorage.clear)

    localStorage.removeItem("tutor");
    sessionStorage.setItem('tutor', JSON.stringify(""));
    this.router.navigate(['/auth/inicio_sesion']).then(() => {
      window.location.reload();
    });
  }


}
