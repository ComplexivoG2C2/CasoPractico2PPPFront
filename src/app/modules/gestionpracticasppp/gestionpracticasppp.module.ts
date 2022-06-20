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
import {VersolicutudesComponent} from "./versolicutudes/versolicutudes.component";
import { Anexo31y4listarComponent } from './anexo31y4listar/anexo31y4listar.component';
import { Anexo6Component } from './anexo6/anexo6.component';
import { Anexo7Component } from './anexo7/anexo7.component';
import { Anexo6listarComponent } from './anexo6listar/anexo6listar.component';
import { EditardelegacionComponent } from './editardelegacion/editardelegacion.component';
import { Anexo9Component } from './anexo9/anexo9.component';
import { BienvenidatutorComponent } from './bienvenidatutor/bienvenidatutor.component';
import {MatSliderModule} from "@angular/material/slider";
import { Anexo7listarComponent } from './anexo7listar/anexo7listar.component';
import { Anexo6consultartutoracademicoComponent } from './anexo6consultartutoracademico/anexo6consultartutoracademico.component';
import { Anexo81Component } from './anexo81/anexo81.component';
import { Anexo81listarComponent } from './anexo81listar/anexo81listar.component';
import { Anexo81listartutoracademicoComponent } from './anexo81listartutoracademico/anexo81listartutoracademico.component';


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
  },{path:'bienvenidatutor', component:BienvenidatutorComponent
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
  },{path:'anexo32y4listar/:cedula', component:Anexo31y4listarComponent
  //anexo5


  //anexo6
  },{path: 'anexo6/:id/:cedula', component: AgregartutoracademicoComponent
  },{path:'anexo6asignaciontutores/:cedula', component:Anexo6Component
  },{path:'anexo6listar/:cedula', component:Anexo6listarComponent
  },{path:'editardelegacion/:id/:cedula', component:EditardelegacionComponent
  },{path:'anexo6consultatutoracademico/:cedula', component:Anexo6consultartutoracademicoComponent

  //anexo7
  },{path:'anexo7actareunion/:cedula', component:Anexo7Component
  },{path:'anexo7listar/:cedula', component:Anexo7listarComponent

  //anexo8
  },{path:'versolicitudesestudiantes/:cedula', component: VersolicitudesestudianteComponent
  }, {path: 'respuestaalestudiante/:cedula', component: Anexo8respuestaalestudianteComponent

  ///anexo8.1

  },{path:'anexo81/:cedula', component: Anexo81Component
  }, {path: 'anexo81listar/:cedula', component: Anexo81listarComponent
  }, {path: 'anexo81listartutoracademico/:cedula', component: Anexo81listartutoracademicoComponent

///anexo9
  },{path:'anexo9/:cedula/:nombrescompletos', component:Anexo9Component

  },{path:'TutorEmpresarial', component: TutorEmpresarialComponent
  },{path:'creartutoremp/:id', component: CreartutorempComponent
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
    ListarTutorComponent,
    Anexo31y4respuestasComponent,
    CreartutorempComponent,
    EstadossolicitudComponent,
    FirmarpostulacionesComponent,
    Anexo31y4listarComponent,
    Anexo6Component,
    Anexo7Component,
    Anexo6listarComponent,
    EditardelegacionComponent,
    Anexo9Component,
    BienvenidatutorComponent,
    Anexo7listarComponent,
    Anexo6consultartutoracademicoComponent,
    Anexo81Component,
    Anexo81listarComponent,
    Anexo81listartutoracademicoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MaterialFileInputModule,
    MatSliderModule
  ],
  exports: [RouterModule]
})
export class GestionpracticaspppModule { }
