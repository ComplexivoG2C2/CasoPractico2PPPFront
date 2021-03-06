import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TutorEmpresarial} from "../../../models/tutorEmpresarial";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaempService} from "../../../services/fechaemp.service";
import Swal from "sweetalert2";
import {TutempresarialService} from "../../../services/tutempresarial.service";

@Component({
  selector: 'app-creartutoremp',
  templateUrl: './creartutoremp.component.html',
  styleUrls: ['./creartutoremp.component.css']
})
export class CreartutorempComponent implements OnInit {

  isLinear = true;
  primerForm!: FormGroup;
  segundoForm!: FormGroup;
  tutorEmpresarial: TutorEmpresarial = new TutorEmpresarial();
  idEmpresa?:Number;
  fechaactual?:Date;

  constructor(private _formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private tutempresarialService: TutempresarialService, private fechaempService:FechaempService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      // @ts-ignore
      this.idEmpresa=id;
      console.log(this.idEmpresa+"ide empresa")
      this.fechaempService.getSysdate().subscribe(value => {
        this.fechaactual = value.fecha;
      })
    })

    this.primerForm = this._formBuilder.group({
      cedula:['',Validators.required],
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      correo:['',Validators.required],
      clave:['',Validators.required],
      titulo:['',Validators.required]
    });
    this.segundoForm = this._formBuilder.group({
    });

  }



  // @ts-ignore
  obtenerDatos():TutorEmpresarial {
    this.tutorEmpresarial.estado=true;
    // @ts-ignore
    this.tutorEmpresarial.empresa_id = this.idEmpresa;
    // @ts-ignore
    this.tutorEmpresarial.idProyectoPPP=null;
    this.tutorEmpresarial.fecha_designacion=this.fechaactual;
    return this.tutorEmpresarial;
    console.log(this.tutorEmpresarial+'datos obtenidos')
  }

  crearTutor(){
    this.tutempresarialService.saveTutores(this.obtenerDatos()).subscribe(data=>{
        Swal.fire({
          title: '??xito',
          text: 'Tutor Registrado',
          icon: 'success',
          iconColor :'#0088ff',
          color: "#000509",
          confirmButtonColor:"#0083fd",
          background: "#faf9f9",
        })
        this.router.navigate(['/panelempresa/gestionpracticasppp/listarTutorEmpresarial']);
      },err=>{
        Swal.fire({
          title: 'Ha surgido un error al Crear Tutor',
          text: "Hubo un error.",
          icon: 'warning',
          color: "#000203",
          confirmButtonColor:"#0089fd",
          background: "#fdfdfd",
        })
      }
    )}
}
