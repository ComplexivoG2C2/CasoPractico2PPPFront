import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {map, startWith} from "rxjs";
import Swal from "sweetalert2";
import {Empresa} from "../../../models/empresa";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";

@Component({
  selector: 'app-anexo2convocatorias',
  templateUrl: './anexo2convocatorias.component.html',
  styleUrls: ['./anexo2convocatorias.component.css']
})
export class Anexo2convocatoriasComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  empresa:Empresa = new Empresa();

  //Validaciones
  omit_special_char(event: { charCode: any; })
  {var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k >= 48 && k <= 57));
  }
  omit_max_char(event:{ target: any; })
  {var k;
    k = event.target.value.length;  //         k = event.keyCode;  (Both can be used)
    console.log(k)
    return (k <= 9);
  }

  constructor(private router: Router,private fechaService:FechaService,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.empresa.idCoordinador=id;
    })
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('[0-9]{7,10}')]],
      correo: ['', [Validators.required,Validators.email]],
      descripcion:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      cedula: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      correo: ['', [Validators.required,Validators.email]],
      nombre1: ['', Validators.required],
      cedula1: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      correo1: ['', [Validators.required,Validators.email]],
    });
  }

  crearEmpresa(empresa:Empresa){
    this.fechaService.getSysdate().subscribe(data=>{
      empresa.fechaCreacion=data.fecha;
      console.log(this.empresa)
      this.empresaService.saveEmpresa(this.empresa).subscribe(data =>{
          console.log(data)
          Swal.fire({
            title: 'Éxito',
            text: 'Empresa Registrada',
            icon: 'success',
            iconColor :'#0082ff',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#2669a6",
          })
          this.router.navigate(['/panelusuario/gestionpracticasppp/verempresas']);
        },err=>{
          Swal.fire({
            title: 'Ha surgido un error',
            text: "Hubo un error",
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#4e94d2",
          })
        }
      )
    })
  }

}
