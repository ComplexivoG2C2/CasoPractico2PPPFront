import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CordinadorVinculacion} from "../../../models/cordinadorvinculacion";
import {Router} from "@angular/router";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";

@Component({
  selector: 'app-vercordinadorvinc',
  templateUrl: './vercordinadorvinc.component.html',
  styleUrls: ['./vercordinadorvinc.component.css']
})
export class VercordinadorvincComponent implements OnInit {
  issloading=true;
  isexist?:boolean
  docente:CordinadorVinculacion = new CordinadorVinculacion();
  constructor( private router: Router,private cordinadorvinculacionService:CordinadorvinculacionService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  ngOnInit(): void {
    this.cordinadorvinculacionService.getCordinadorVinculacion().subscribe(data=>{
      this.isexist= data.filter(value => value.estado==true).length!=0;
      this.docente=data.filter(value => value.estado==true)[0];
      this.issloading=false;
    })
  }

  deleteCordinadorVinculacion(docente:CordinadorVinculacion){
    Swal.fire({
      title: 'Eliminar Coordinador de Vinculación',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0480fa',
      cancelButtonColor: '#dda733',
      background: "#455a64",
      color: "#fbfcff",
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cordinadorvinculacionService.existCordinadorVinculacion(docente.cedula+"").subscribe(data=>{
          if(data==true){
            docente.estado=false;
            this.cordinadorvinculacionService.updateCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Eliminado',
                text: '',
                icon: 'success',
                iconColor :'#005ef5',
                color: "#fbfcff",
                confirmButtonColor:"#0b3052",
                background: "#455a64",
              })
              this.router.navigate(['/panelusuario/gestionpracticasppp/cordinadorvinculacion']);
            },err => {
              Swal.fire({
                title: 'Ha surgido un error',
                text: "Hubo un error",
                icon: 'warning',
                iconColor :'#005ef5',
                color: "#f7f7fa",
                confirmButtonColor:"#0c3255",
                background:"#455a64",
              })
            })
          }
        })
      }
    })
  }

}
