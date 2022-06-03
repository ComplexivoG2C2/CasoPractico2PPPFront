import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../auth/iniciosesion/iniciosesion.component";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-anexo2',
  templateUrl: './anexo2.component.html',
  styleUrls: ['./anexo2.component.css']
})
export class Anexo2Component implements OnInit {
  isLinear = true;
  firstFormGroup?: FormGroup;
  isLoading=true;
  secondFormGroup?: FormGroup;
  entidad:Entidadbeneficiaria = new Entidadbeneficiaria();

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

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
this.isLoading=false;
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.entidad.idCoordinador=id;
    })
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('[0-9]{7,10}')]],
      correo: ['', [Validators.required,Validators.email]],
      descripcion:['']
    });
  }
}
