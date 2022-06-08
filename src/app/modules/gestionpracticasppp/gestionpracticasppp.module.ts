import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BienvenidaComponent} from "./bienvenida/bienvenida.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import { Anexo1Component } from './anexo1/anexo1.component';
import { AsignarcordinadorvincComponent } from './asignarcordinadorvinc/asignarcordinadorvinc.component';
import { VercordinadorvincComponent } from './vercordinadorvinc/vercordinadorvinc.component';
import { Anexo2convocatoriasComponent } from './anexo2convocatorias/anexo2convocatorias.component';
import { NuevoresponsablepppComponent } from './nuevoresponsableppp/nuevoresponsableppp.component';
import { VerresponsableComponent } from './verresponsable/verresponsable.component';
import { CrearempresaComponent } from './crearempresa/crearempresa.component';
import { VerempresaComponent } from './verempresa/verempresa.component';
import { BienvenidaempresaComponent } from './bienvenidaempresa/bienvenidaempresa.component';
import 'animate.css';
import { NuevasolicitudComponent } from './nuevasolicitud/nuevasolicitud.component';
import { VersolicutudesComponent } from './versolicutudes/versolicutudes.component';
import {Anexo3Component} from "./anexo3/anexo3.component";
import { MatTabsModule } from '@angular/material/tabs';


const routes: Routes = [
  {path: 'bienvenida',
    component: BienvenidaComponent
  },{path:'cordinadorvinculacion',
    component:AsignarcordinadorvincComponent
  },{path:'vercordinadorvinculacion',
    component:VercordinadorvincComponent
  },{ path: 'anexo1/:cedula/:nombres',
    component: Anexo1Component
  },{ path: 'anexo2convocatorias/:id',
    component: Anexo2convocatoriasComponent
  },{ path: 'nuevoresponsableppp/:cedula',
    component: NuevoresponsablepppComponent
  },{ path: 'verresponsableppp/:cedula',
    component: VerresponsableComponent
  },{path:'crearempresa/:id',
    component:CrearempresaComponent
  }, {path:'verempresa',
    component:VerempresaComponent
  },{path:'bienvenidaempresa',
    component:BienvenidaempresaComponent
  },{path:'nuevasolicitud',
    component:NuevasolicitudComponent
  },{path:'versolicitud',
    component:VersolicutudesComponent
  },{path:'anexo3/:cedula',
    component:Anexo3Component
  }

]

@NgModule({
  declarations: [
    BienvenidaComponent,
    Anexo1Component,
    AsignarcordinadorvincComponent,
    VercordinadorvincComponent,
    Anexo2convocatoriasComponent,
    NuevoresponsablepppComponent,
    VerresponsableComponent,
    CrearempresaComponent,
    VerempresaComponent,
    BienvenidaempresaComponent,
    NuevasolicitudComponent,
    VersolicutudesComponent,
    Anexo3Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule,
    MatTabsModule,
  ],
  exports: [RouterModule]
})
export class GestionpracticaspppModule { }
