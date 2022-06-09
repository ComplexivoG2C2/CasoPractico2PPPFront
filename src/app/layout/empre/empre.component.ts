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
//   /*Este controller maneja el diseño principal.Las estructura
//   * de la navegación donde esta divide en 3 secciones el Header donde
//   * se encuntra el nombre del usuario asi como la el booton de cerrar sesion*/
//
//
//   //Estado de barra lateral visible/no visible
//   panelOpenState = false;
//   //Para almacenar los datos de usuario el inciar session
//   public empresa: Empresa = new Empresa();
//   //Obtine el nombre completo de rol correspondiente
//   public rolnombre: string = "";
//   //Maneja el estado de carga de esta pagina
//   issloading = true;
//
//   constructor(private router: Router) {
//   }
//
//   ngAfterViewInit(): void {
//     setTimeout(() => {
//       this.issloading = false;
//     }, 1000)
//   }
//
//   ngOnInit(): void {
//     if (JSON.parse(sessionStorage['empresa']) != "") {
//       //Obtine los datos el de incio de sesion con el JSON
//       this.empresa = JSON.parse(sessionStorage['empresa']);
//
//       sessionStorage.clear;
//     } else {
//       sessionStorage.clear;
//       localStorage.removeItem("empresa");
//       sessionStorage.setItem('empresa', JSON.stringify(""));
//       this.router.navigate(['/auth/inicio_sesion']).then(() => {
//         window.location.reload();
//       });
//     }
//
//
//   }
//
//
//
//   logout(): void {
//     sessionStorage.clear;
//     localStorage.removeItem("empresa");
//     sessionStorage.setItem('empresa', JSON.stringify(""));
//     this.router.navigate(['/auth/loginempresa']).then(() => {
//       window.location.reload();
//     });
//   }
// }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  //Variables
  //Imgen obtendida desde el Auth2 de google.
  public email?:string;
  //Estado de barra lateral visible/no visible
  panelOpenState = false;
  //Para almacenar los datos de usuario el inciar session
  empre:Empresa=new Empresa();
  //Obtine el nombre completo de rol correspondiente

  //Maneja el estado de carga de esta pagina
  issloading=true;

  constructor(private router:Router,private observer: BreakpointObserver) {

  }


  ngOnInit(): void {


    //Obtine los datos el de incio de sesion con el JSON
    this.empre=JSON.parse(sessionStorage['empre']);
    this.email=JSON.parse(sessionStorage['empre']).email
    sessionStorage.clear;
    this.issloading=false
  }



  ngAfterViewInit(): void {
    {
      this.observer.observe(['(max-width: 2000px)']).pipe(delay(5), untilDestroyed(this)).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      this.router.events.pipe(untilDestroyed(this), filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
    }
  }
  logout():void{
    this.router.navigate(['/auth/inicio_sesion']);
  }
}
