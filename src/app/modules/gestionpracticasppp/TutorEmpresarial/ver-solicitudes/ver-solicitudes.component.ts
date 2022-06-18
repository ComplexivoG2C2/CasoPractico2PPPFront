import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Solicitudproyecto} from "../../../../models/solicitudproyecto";
import {FechaService} from "../../../../services/fecha.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TutorEmpresarialService} from "../../../../services/tutor-empresarial.service";
import {ProyectoempService} from "../../../../services/proyectoemp.service";

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css']
})
export class VerSolicitudesComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  solicitud:Solicitudproyecto[]=[];
  filteredOptions?: Observable<Solicitudproyecto[]>;
  constructor(private fechaService:FechaService,private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,private proyectoS:ProyectoempService) { }

  ngOnInit(): void {
  }

}
