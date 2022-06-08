import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Empresa} from "../../../models/empresa";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {CarrerasService} from "../../../services/carreras.service";
import {Anexo1} from "../../../models/anexo1";
import {Carreras} from "../../../models/carreras";
import {LoginempresaComponent} from "../../auth/loginempresa/loginempresa.component";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Resposableppp} from "../../../models/resposableppp";
import {MatSelectChange} from "@angular/material/select";
@Component({
  selector: 'app-nuevasolicitud',
  templateUrl: './nuevasolicitud.component.html',
  styleUrls: ['./nuevasolicitud.component.css']
})
export class NuevasolicitudComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  empresa:Empresa = new Empresa();
  anexo:Anexo1 = new Anexo1();
  proyecto:Solicitudproyecto = new Solicitudproyecto();
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

  listaCarreras?:String;
  siglas?:String;

  constructor(private router: Router,private fechaService:FechaService,private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,private empresaService:EmpresaService ,
              private  carreras:CarrerasService, private proyectoS:ProyectoService, private responsable:ResponsablepppService,
              private empresaS:EmpresaService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.empresa.idCoordinador=id;
    })
    this.firstFormGroup = this._formBuilder.group({
      descripcion:[''],
      responsable:[''],
      titulo:[''],
      fechaI:[''],
      actividades:[''],
      numeroEst:[''],
      carrera:[''],
      fecha:[''],

      ///validacion campos 2 representantee
      // nombrer: ['', Validators.required],
      // cedular: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      // correor: ['', [Validators.required,Validators.email]],
    });

//     this.carreras.getCarreras().subscribe(value1 => {
//   //@ts-ignore
//       this.listaCarreras=value1.filter(value2 => value2.codigo == value[0].codigo)[0].nombre
// //@ts-ignore
//       this.siglas=value1.filter(value2=>value2.codigo == value[0].codigo)[0].codigo
//       console.log(value1+"Value")
//     });
  }

  proyecto2:Solicitudproyecto=new Solicitudproyecto();
  res:Resposableppp =new Resposableppp();
  abc?:String;
  obtenerDatos():Solicitudproyecto{
    this.proyecto.estado= false;
    this.proyecto.nombreresponsable = this.abc;
    this.proyecto.carrera = this.carreraNombre;
    this.proyecto.empresa=1;
    this.proyecto.responsablePPP=1;
    return this.proyecto2=this.proyecto;
  }

  carrera?:String;
  carreraNombre?:String;
  carreraModel:Carreras = new Carreras();
  obtenerResponsable(event: MatSelectChange){
    console.log("entraResponsable")
    this.carrera = this.proyecto.codigocarrera;
    this.responsable.getResposablepppbyCarrera(this.carrera+"").subscribe(value=>{
      this.res=value
      this.abc=value.nombres_completo;
    });

    this.carreras.getCarrerabyCodigo(this.carrera+"").subscribe(value=>{
      this.carreraModel= value
      this.carreraNombre=value.nombre;
    });


  }


  almacenarSolicitud(){
    console.log("Almacenar")
    this.proyectoS.saveSolicitudes(this.obtenerDatos()).subscribe(value => {
      console.log("entra"+ this.proyectoS);
      Swal.fire({
        title: 'Exito',
        text: 'Solicitud enviada',
        icon: 'success',
        iconColor :'#0064ff',
        color: "#050000",
        confirmButtonColor:"#0085ff",
        background: "#ffffff",
      })
    },error => {
      Swal.fire({
        title: 'Error',
        text: '...' + error.error.message,
        icon: 'error',
        iconColor :'#007cff',
        color: "#090000",
        confirmButtonColor:"#0081ff",
        background: "#ffffff",
      })
    });
  }


}
