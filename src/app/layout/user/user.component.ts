import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit {
  /*Este controller maneja el diseño principal.Las estructura
  * de la navegación donde esta divide en 3 secciones el Header donde
  * se encuntra el nombre del usuario asi como la el booton de cerrar sesion*/

  //Variables
  //Imgen obtendida desde el Auth2 de google.
  public foto?:string
  //Estado de barra lateral visible/no visible
  panelOpenState = false;
  //Para almacenar los datos de usuario el inciar session
  public persona:User=new User();
  //Obtine el nombre completo de rol correspondiente
  public rolnombre:string="";
  //Maneja el estado de carga de esta pagina
  issloading=true;

  constructor(private router:Router) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user'])!=""){
      //Obtine los datos el de incio de sesion con el JSON
      this.persona=JSON.parse(sessionStorage['user']);
      this.foto=JSON.parse(sessionStorage['user']).urlFoto
      this.rolnombre=this.geRolName(JSON.parse(sessionStorage['user']).rol);
      sessionStorage.clear;
    }else {
      sessionStorage.clear;
      localStorage.removeItem("user");
      sessionStorage.setItem('user', JSON.stringify(""));
      this.router.navigate(['/auth/inicio_sesion']).then(() => {
        window.location.reload();
      });
    }


  }


  //Designa el nombre completo de rol atraves de abreviaturas.
  geRolName(rol:string):string{
    if(rol=="AUT"){
      return "AUTORIDAD";
    }
    if(rol=="CC"){
      return "COORDINADOR/A DE CARRERA";
    }
    if(rol=="CV"){
      return "COORDINADOR/A DE VINCULACIÓN";
    }
    // if(rol=="TE"){
    //   return "TUTOR EMPRESARIAL";
    // }
    if(rol=="DA"){
      return "TUTOR ACADEMICO";
    }
    if(rol=="RPPP"){
      return "RESPONSABLE DE PRÁCTICAS PREPROFESIONALES";
    }
    if(rol=="EST"){
      return "ESTUDIANTE";
    }
    if(rol=="DOC"){
      return "DOCENTE";
    }
    // if(rol==null){
    //   return "EMPRESA";
    // }
    return "Si rol";
  }
  logout():void{
    sessionStorage.clear;
    console.log("salir usuario "+sessionStorage.clear)
    localStorage.removeItem("user");
    sessionStorage.setItem('user', JSON.stringify(""));
    this.router.navigate(['/auth/inicio_sesion']).then(() => {
      window.location.reload();
    });
  }
}
