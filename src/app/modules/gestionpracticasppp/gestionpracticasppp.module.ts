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


const routes: Routes = [
  {path: 'bienvenida',
    component: BienvenidaComponent
  },{path:'cordinadorvinculacion',
    component:AsignarcordinadorvincComponent
  },{path:'vercordinadorvinculacion',
    component:VercordinadorvincComponent
  },{ path: 'anexo1',
    component: Anexo1Component
  }

]

@NgModule({
  declarations: [
    BienvenidaComponent,
    Anexo1Component,
    AsignarcordinadorvincComponent,
    VercordinadorvincComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule
  ],
  exports: [RouterModule]
})
export class GestionpracticaspppModule { }
