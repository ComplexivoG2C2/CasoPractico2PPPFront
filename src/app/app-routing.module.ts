import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./layout/user/user.component";
import {EmpreComponent} from "./layout/empre/empre.component";

const routes: Routes = [
  {path:'',redirectTo:'/auth/inicio_sesion',pathMatch:'full'},
  {path:'',redirectTo:'/auth/loginempresa',pathMatch:'full'},
  {path:'auth',
    loadChildren:()=>
      import('./modules/auth/auth.module').then((m)=>m.AuthModule)
  },{path:"panelusuario",component:UserComponent,
    children:[
      {path:'gestionpracticasppp',
        loadChildren: ()=>
          import('./modules/gestionpracticasppp/gestionpracticasppp.module').then((m)=>m.GestionpracticaspppModule)
      }
    ]
  },
  {path:"panelempresa",component:EmpreComponent,
    children:[
      {path:'gestionpracticasppp',
        loadChildren: ()=>
          import('./modules/gestionpracticasppp/gestionpracticasppp.module').then((m)=>m.GestionpracticaspppModule)
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
