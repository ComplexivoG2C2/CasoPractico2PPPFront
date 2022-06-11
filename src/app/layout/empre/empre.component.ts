import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {NavigationEnd, Router} from "@angular/router";
import {Empresa} from "../../models/empresa";
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay, filter} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
@UntilDestroy()
@Component({
  selector: 'app-empre',
  templateUrl: './empre.component.html',
  styleUrls: ['./empre.component.css']
})
export class EmpreComponent implements OnInit,AfterViewInit {



  public emailEmpresa?:string;
  //Estado de barra lateral visible/no visible
  panelOpenState = false;
  //Para almacenar los datos de usuario el inciar session
  empresa:Empresa=new Empresa();
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

    if (JSON.parse(sessionStorage['emp']) != "") {
      //Obtine los datos el de incio de sesion con el JSON
      this.empresa=JSON.parse(sessionStorage['emp']);
      this.emailEmpresa=JSON.parse(sessionStorage['emp']).emailEmpresa
      sessionStorage.clear;
    } else {
      sessionStorage.clear;
      localStorage.removeItem("emp");
      sessionStorage.setItem('emp', JSON.stringify(""));
      this.router.navigate(['auth/inicio_sesion']).then(() => {
        window.location.reload();
      });
    }

  }


  logout():void{
    sessionStorage.clear;
    console.log("salir empresa "+sessionStorage.clear)

    localStorage.removeItem("emp");
    sessionStorage.setItem('emp', JSON.stringify(""));
    this.router.navigate(['/auth/inicio_sesion']).then(() => {
      window.location.reload();
    });
  }


}
