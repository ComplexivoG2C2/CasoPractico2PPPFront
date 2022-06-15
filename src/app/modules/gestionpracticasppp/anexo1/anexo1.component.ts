import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FechaService} from "../../../services/fecha.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-anexo1',
  templateUrl: './anexo1.component.html',
  styleUrls: ['./anexo1.component.css']
})
export class Anexo1Component implements OnInit {
  isLinear = true;
  panelOpenState = true;
  issloading = true;

  thirdFormGroup!: FormGroup;
  fourFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;

  isexist?:boolean;

  cedula?: String;
  nombre?:String;


  //Validaciones de correo y numeros de telefono
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private fechaService: FechaService
  ) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
      this.cedula = cedula;
      console.log(cedula)
    })

    this.issloading=false;
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup=this._formBuilder.group({});
    this.thirdFormGroup=this._formBuilder.group({});
    this.fourFormGroup=this._formBuilder.group({});


  }

}
