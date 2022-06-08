import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {Empresa} from "../../models/empresa";

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit,AfterViewInit {
  /*Este controller maneja el diseño principal.Las estructura
  * de la navegación donde esta divide en 3 secciones el Header donde
  * se encuntra el nombre del usuario asi como la el booton de cerrar sesion*/


  //Estado de barra lateral visible/no visible
  panelOpenState = false;
  //Para almacenar los datos de usuario el inciar session
  public emp: Empresa = new Empresa();
  //Obtine el nombre completo de rol correspondiente
  public rolnombre: string = "";
  //Maneja el estado de carga de esta pagina
  issloading = true;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issloading = false;
    }, 1000)
  }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage['empresa']) != "") {
      //Obtine los datos el de incio de sesion con el JSON
      this.emp = JSON.parse(sessionStorage['empresa']);

      sessionStorage.clear;
    } else {
      sessionStorage.clear;
      localStorage.removeItem("empresa");
      sessionStorage.setItem('empresa', JSON.stringify(""));
      this.router.navigate(['/auth/inicio_sesion']).then(() => {
        window.location.reload();
      });
    }


  }



  logout(): void {
    sessionStorage.clear;
    localStorage.removeItem("empresa");
    sessionStorage.setItem('empresa', JSON.stringify(""));
    this.router.navigate(['/auth/loginempresa']).then(() => {
      window.location.reload();
    });
  }
}
