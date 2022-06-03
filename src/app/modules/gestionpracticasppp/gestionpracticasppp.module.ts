import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BienvenidaComponent} from "./bienvenida/bienvenida.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import { Anexo1Component } from './anexo1/anexo1.component';
import { Anexo2Component } from './anexo2/anexo2.component';
import {MatStepperModule} from '@angular/material/stepper';

const routes: Routes = [
  {
    path: 'bienvenida',
    component: BienvenidaComponent
  },
  {
    path: 'anexo1',
    component: Anexo1Component
  },
  {
    path: 'anexo2',
    component: Anexo2Component
  }
]

@NgModule({
  declarations: [
    BienvenidaComponent,
    Anexo1Component,
    Anexo2Component,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialFileInputModule,
    MatStepperModule
  ],
  exports: [RouterModule]
})
export class GestionpracticaspppModule { }
