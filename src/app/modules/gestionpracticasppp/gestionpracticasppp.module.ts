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
import { AgregartutoracademicoComponent } from './agregartutoracademico/agregartutoracademico.component';
import { VerconvocatoriasComponent } from './verconvocatorias/verconvocatorias.component';
import { VerestadoconvocatoriasComponent } from './verestadoconvocatorias/verestadoconvocatorias.component';
import { Anexo3Component } from './anexo3/anexo3.component';
import { VersolicitudesestudianteComponent } from './versolicitudesestudiante/versolicitudesestudiante.component';
import { Anexo8respuestaalestudianteComponent } from './anexo8respuestaalestudiante/anexo8respuestaalestudiante.component';
import {CrearTutorComponent} from "./TutorEmpresarial/crear-tutor/crear-tutor.component";
import {TutorEmpresarialComponent} from "./tutor-empresarial/tutor-empresarial.component";
import {ListarTutorComponent} from "./TutorEmpresarial/listar-tutor/listar-tutor.component";


const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent
  },{path:'cordinadorvinculacion', component:AsignarcordinadorvincComponent
  },{path:'vercordinadorvinculacion', component:VercordinadorvincComponent
  },{path:'anexo1/:cedula/:nombres', component: Anexo1Component
  },{path:'anexo2convocatorias/:id', component: Anexo2convocatoriasComponent
  },{path:'nuevoresponsableppp/:cedula', component: NuevoresponsablepppComponent
  },{path:'verresponsableppp/:cedula', component: VerresponsableComponent
  },{path:'crearempresa/:id', component:CrearempresaComponent
  },{path:'verempresa', component:VerempresaComponent
  },{path:'bienvenidaempresa', component:BienvenidaempresaComponent
  },{path:'nuevasolicitud/:id/:nombreempresa/:nombresolicitante/:cargosolicitante', component:NuevasolicitudComponent
  },{path:'versolicitud/:id/:nombreempresa/:nombresolicitante/:cargosolicitante', component:VersolicutudesComponent
  },{path:'anexo2convocatoria/:cedula', component: Anexo2convocatoriasComponent
  },{path:'verconvocatorias/:cedula', component: VerconvocatoriasComponent
  },{path:'anexo3/:cedula', component: Anexo3Component
  }
  ,{path:'anexo6/:id/:cedula', component: AgregartutoracademicoComponent
  }
  ,{path:'versolicitudesestudiantes/:cedula', component: VersolicitudesestudianteComponent
  },{path:'respuestaalestudiante/:cedula', component: Anexo8respuestaalestudianteComponent
  },{path:'TutorEmpresarial', component: TutorEmpresarialComponent
  },{path:'crearTutorEmpresarial', component: CrearTutorComponent
},{path:'listarTutorEmpresarial', component:ListarTutorComponent
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
    AgregartutoracademicoComponent,
    VerconvocatoriasComponent,
    VerestadoconvocatoriasComponent,
    Anexo3Component,
    VersolicitudesestudianteComponent,
    Anexo8respuestaalestudianteComponent,
    TutorEmpresarialComponent,
    CrearTutorComponent,
    ListarTutorComponent
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
