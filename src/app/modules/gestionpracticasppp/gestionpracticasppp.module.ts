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
import {TutorEmpresarialComponent} from "./tutor-empresarial/tutor-empresarial.component";
import {ListarTutorComponent} from "./TutorEmpresarial/listar-tutor/listar-tutor.component";
import { Anexo31y4respuestasComponent } from './anexo31y4respuestas/anexo31y4respuestas.component';
import { CreartutorempComponent } from './creartutoremp/creartutoremp.component';
import { EstadossolicitudComponent } from './estadossolicitud/estadossolicitud.component';
import { FirmarpostulacionesComponent } from './firmarpostulaciones/firmarpostulaciones.component';


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
    ////Anexo3
  },{path: 'anexo3/:cedula', component: Anexo3Component
  },{path:'estadossolicitud/:cedula', component:EstadossolicitudComponent
  },{path: 'firmarportulaciones/:cedula', component: FirmarpostulacionesComponent
    //anexo 3.1 y 4
  },{path:'anexo32y4respuestaaempresa/:cedula', component:Anexo31y4respuestasComponent

  },{path:'listarTutorEmpresarial', component:ListarTutorComponent
  }
  //anexo5

  ,{path:'anexo6/:id/:cedula', component: AgregartutoracademicoComponent


  //anexo7

  },{path:'versolicitudesestudiantes/:cedula', component: VersolicitudesestudianteComponent
  },{path:'respuestaalestudiante/:cedula', component: Anexo8respuestaalestudianteComponent
  },{path:'TutorEmpresarial', component: TutorEmpresarialComponent
}, {path:'creartutoremp/:id', component: CreartutorempComponent
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
    ListarTutorComponent,
    Anexo31y4respuestasComponent,
    CreartutorempComponent,
    EstadossolicitudComponent,
    FirmarpostulacionesComponent
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
