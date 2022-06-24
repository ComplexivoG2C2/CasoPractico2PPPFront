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
import { Anexo9tutoracademicoComponent } from './anexo9tutoracademico/anexo9tutoracademico.component';
import { Anexo10Component } from './anexo10/anexo10.component';
import { Anexo10listartutoracademicoComponent } from './anexo10listartutoracademico/anexo10listartutoracademico.component';
import { Anexo11Component } from './anexo11/anexo11.component';
import { Anexo14Component } from './anexo14/anexo14.component';
import { Anexo14verComponent } from './anexo14ver/anexo14ver.component';
import { Anexo15Component } from './anexo15/anexo15.component';
import { Anexo15verComponent } from './anexo15ver/anexo15ver.component';
import { Anexo11listarComponent } from './anexo11listar/anexo11listar.component';
import { Anexo14listarComponent } from './anexo14listar/anexo14listar.component';
import { VerestadosolicituempresaComponent } from './verestadosolicituempresa/verestadosolicituempresa.component';
import { Anexo5Component } from './anexo5/anexo5.component';
import { Anexo12Component } from './anexo12/anexo12.component';
import { Anexo12listarComponent } from './anexo12listar/anexo12listar.component';
import { Anexo121Component } from './anexo121/anexo121.component';
import { Anexo5listarComponent } from './anexo5listar/anexo5listar.component';
import { Anexo5listarcoordinacionComponent } from './anexo5listarcoordinacion/anexo5listarcoordinacion.component';
import { Anexo5listarempresaComponent } from './anexo5listarempresa/anexo5listarempresa.component';
import { Anexo7firmarComponent } from './anexo7firmar/anexo7firmar.component';
import { Firmaranexo9Component } from './firmaranexo9/firmaranexo9.component';
import { Anexo9firmarComponent } from './anexo9firmar/anexo9firmar.component';


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
  },{path:'asignarTutor/:id/:pro/:carrera/:responsable', component:Anexo5Component
  },{path:'anexo5listar/:nombres', component:Anexo5listarComponent
  },{path:'anexo5responsableppp/:cedula', component:Anexo5listarcoordinacionComponent
  },{path:'anexo5empresa/:id', component:Anexo5listarempresaComponent


  //anexo6
  },{path: 'anexo6/:id/:cedula', component: AgregartutoracademicoComponent
  },{path:'anexo6asignaciontutores/:cedula', component:Anexo6Component
  },{path:'anexo6listar/:cedula', component:Anexo6listarComponent
  },{path:'editardelegacion/:id/:cedula', component:EditardelegacionComponent
  },{path:'anexo6consultatutoracademico/:cedula', component:Anexo6consultartutoracademicoComponent

  //anexo7
  },{path:'anexo7actareunion/:cedula', component:Anexo7Component
  },{path:'anexo7listar/:cedula', component:Anexo7listarComponent
  },{path:'anexo7firmar/:nombres', component:Anexo7firmarComponent


  //anexo8
  },{path:'versolicitudesestudiantes/:cedula', component: VersolicitudesestudianteComponent
  }, {path: 'respuestaalestudiante/:cedula', component: Anexo8respuestaalestudianteComponent

  ///anexo8.1

  },{path:'anexo81/:cedula', component: Anexo81Component
  }, {path: 'anexo81listar/:cedula', component: Anexo81listarComponent
  }, {path: 'anexo81listartutoracademico/:cedula', component: Anexo81listartutoracademicoComponent

///anexo9
  },{path:'anexo9/:cedula/:nombres', component:Anexo9Component
  },{path:'anexo9tutoracademico', component:Anexo9tutoracademicoComponent

///anexo10
  },{path:'anexo10/:id/:cedula/:nombres', component:Anexo10Component
  },{path:'anexo10listartutoracademico/:cedula/:nombres', component:Anexo10listartutoracademicoComponent

//anexo11
  },{path:'anexo11/:cedula/:nombres', component:Anexo11Component
  },{path:'anexo11listar/:cedula', component:Anexo11listarComponent


    //anexo12
  },{path:'anexo12/:idpro/:nombre/:cedula', component:Anexo12Component



    ////anexo12.1
  },{path:'anexo121/:idpro/:nombre', component:Anexo121Component

    //anexo14
  },{path:'anexo14/:cedula/:nombres', component:Anexo14Component

//anexo15
  },{path:'anexo15/:cedula/:nombres', component:Anexo15Component

  },{path:'TutorEmpresarial', component: TutorEmpresarialComponent
  },{path:'creartutoremp/:id', component: CreartutorempComponent
  },{path:'listarTutorEmpresarial', component:ListarTutorComponent
  },{path:'verestadoempresa/:id/:emp', component:VerestadosolicituempresaComponent

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
    Anexo81listartutoracademicoComponent,
    Anexo9tutoracademicoComponent,
    Anexo10Component,
    Anexo10listartutoracademicoComponent,
    Anexo11Component,
    Anexo14Component,
    Anexo14verComponent,
    Anexo15Component,
    Anexo15verComponent,
    Anexo11listarComponent,
    Anexo14listarComponent,
    VerestadosolicituempresaComponent,
    Anexo5Component,
    Anexo12Component,
    Anexo12listarComponent,
    Anexo121Component,
    Anexo5listarComponent,
    Anexo5listarcoordinacionComponent,
    Anexo5listarempresaComponent,
    Anexo7firmarComponent,
    Firmaranexo9Component,
    Anexo9firmarComponent
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
