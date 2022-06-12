import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Docentes} from "../../../models/docentes";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Resposableppp} from "../../../models/resposableppp";

@Component({
  selector: 'app-verresponsable',
  templateUrl: './verresponsable.component.html',
  styleUrls: ['./verresponsable.component.css']
})
export class VerresponsableComponent implements OnInit {
  issloading=true;
  isexist?:boolean=true;
  panelOpenState = false;
  cedula?:String;
  responsableppp:Docentes= new Docentes;
  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute,private responsablepppService:ResponsablepppService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
        // @ts-ignore
        this.carrera=value[0].codigo;
        // @ts-ignore
        this.responsablepppService.getResposablepppbyCarrera(value[0].codigo).subscribe(data=>{
          this.responsableppp=data;
          this.issloading=false;
          console.log(this.responsableppp)
        },err=>{
          this.issloading=false;
          this.isexist=false;
        })
      })
    })
  }

  eliminarrppp(responsable:Resposableppp){
    responsable.estado=false;
    Swal.fire({
      title: 'Eliminar Responsable de prácticas de Servicio Comunitario',

      icon: 'warning',
      showCancelButton: true,
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      background: "#fdfcf9",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsablepppService.updateResposableppp(responsable).subscribe(datau=>{
          Swal.fire({
            title: 'Se ha eliminado la asiganción correctamente',

            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#f5f4f3",
          })
          this.router.navigate(['/panelusuario/proyectovinculacion/nuevoresponsable',this.cedula]);
        },err => {
          Swal.fire({
            title: 'Ha surgido un error',
            text: "Hubo un error, contáctese con TICs.",
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#ffffff",
          })
        })
      }
    })
  }

}
