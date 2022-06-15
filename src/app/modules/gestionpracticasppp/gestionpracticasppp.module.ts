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
import {MatDialogModule} from "@angular/material/dialog";
import {Anexo4SeleccionEComponent} from "./anexo4-seleccion-e/anexo4-seleccion-e.component";
import { Anexo31Component } from './anexo31/anexo31.component';
import { Anexo81Component } from './anexo81/anexo81.component';


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
  },{path:'nuevasolicitud/:id/:nombres',
    component:NuevasolicitudComponent
  },{path:'versolicitud',
    component:VersolicutudesComponent
  },{path:'anexo3_1',
    component:Anexo31Component
  },{path:'anexo8_1',
    component:Anexo81Component
  }

]

@NgModule({
  declarations: [
    BienvenidaComponent,
    Anexo1Component,
    AsignarcordinadorvincComponent,
    VercordinadorvincComponent,
    Anexo2convocatoriasComponent,
    Anexo4SeleccionEComponent,
    NuevoresponsablepppComponent,
    VerresponsableComponent,
    CrearempresaComponent,
    VerempresaComponent,
    BienvenidaempresaComponent,
    NuevasolicitudComponent,
    VersolicutudesComponent,
    Anexo31Component,
    Anexo81Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MaterialFileInputModule,
  ],
  exports: [RouterModule]
})
export class GestionpracticaspppModule { }
