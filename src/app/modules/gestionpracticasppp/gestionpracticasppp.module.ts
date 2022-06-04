import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BienvenidaComponent} from "./bienvenida/bienvenida.component";
import {MaterialFileInputModule} from "ngx-material-file-input";
import { Anexo1Component } from './anexo1/anexo1.component';
import { Anexo3Component } from './anexo3/anexo3.component';


const routes: Routes = [
  {
    path: 'bienvenida',
    component: BienvenidaComponent
  },
  {
    path: 'anexo1',
    component: Anexo1Component
  },{
    path: 'anexo3',
    component: Anexo3Component
  }

]

@NgModule({
  declarations: [
    BienvenidaComponent,
    Anexo1Component,
    Anexo3Component
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
