import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {tutorEmpresarial} from "../../../../models/tutorEmpresarial";
import {ActivatedRoute, Router} from "@angular/router";
import {TutorEmpresarialService} from "../../../../services/tutor-empresarial.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.css']
})
export class CrearTutorComponent implements OnInit {
  omit_special_char(event: { charCode: any; }) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k >= 48 && k <= 57));
  }

  omit_max_char(event: { target: any; }) {
    var k;
    k = event.target.value.length;  //         k = event.keyCode;  (Both can be used)
    console.log(k)
    return (k <= 9);
  }

  isLinear = true;
  primerForm!: FormGroup;
  segundoForm!: FormGroup;
  tutor: tutorEmpresarial = new tutorEmpresarial();
  idEmpresa?:Number;

  constructor(private _formBuilder: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute,
              private tutorS: TutorEmpresarialService) {

  }

  ngOnInit(): void {
    this.primerForm = this._formBuilder.group({
      cedula:[''],
      nombres:[''],
      apellidos:[''],
      correo:[''],
      clave:['']
    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let nombre = params['nombres']

      this.idEmpresa=id;
      console.log(this.idEmpresa+"ide empresa")
    })
  }

  obtenerDatos(){
    this.tutor.estado=false;
    this.tutor.empresaId = (sessionStorage.getItem('idEmpresa')+"");
    this.tutor.coordinadorId=1;
    this.tutor.fechaDesignacion=new Date();
    return this.tutor;
  }

  crearTutor(tutor:tutorEmpresarial){
    this.obtenerDatos();
    console.log(this.tutor.cedula + "Tutor Log")
    this.tutorS.saveTutor(this.tutor).subscribe(data=>{
      console.log(data)
      Swal.fire({
        title: 'Éxito',
        text: 'Empresa Registrada',
        icon: 'success',
        iconColor :'#0088ff',
        color: "#000509",
        confirmButtonColor:"#0083fd",
        background: "#faf9f9",
      })
      this.router.navigate(['/panelusuario/gestionpracticasppp/crearTutorEmpresarial']);
    },err=>{
        Swal.fire({
          title: 'Ha surgido un error',
          text: "Hubo un error.",
          icon: 'warning',
          color: "#000203",
          confirmButtonColor:"#0089fd",
          background: "#fdfdfd",
        })
      }
    )}
}
