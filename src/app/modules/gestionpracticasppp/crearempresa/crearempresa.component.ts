import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Empresa } from 'src/app/models/empresa';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";

@Component({
  selector: 'app-crearempresa',
  templateUrl: './crearempresa.component.html',
  styleUrls: ['./crearempresa.component.css']
})
export class CrearempresaComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  empresa: Empresa = new Empresa();

  //Validaciones de correo y telefonos
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

  fechaactual?: Date;

  constructor(private router: Router, private fechaService: FechaService, private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder, private empresaService: EmpresaService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.empresa.idCoordinador = id;
    })
    this.fechaService.getSysdate().subscribe(value => {
      this.fechaactual = value.fecha;
    })
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      descripcion: [''],
      titulo: ['', Validators.required],

      nombrer: ['', Validators.required],
      cedular: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      correor: ['', [Validators.required, Validators.email]],
    });

  }

  crearEmpresa(empresa: Empresa) {

    empresa.fechaCreacion = this.fechaactual
    //console.log(this.entidad)
    this.empresaService.saveEmpresa(this.empresa).subscribe(data => {
      // console.log(data)
      Swal.fire({
        title: 'Empresa Registrada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate(['/panelusuario/gestionpracticasppp/verempresa']);
    }, error => {
      Swal.fire({
        title: 'No se pudo crear',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    });
  }
}
