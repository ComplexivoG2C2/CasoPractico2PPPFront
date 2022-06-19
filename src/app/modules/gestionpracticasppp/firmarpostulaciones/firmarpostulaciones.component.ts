import { Component, OnInit } from '@angular/core';
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {Anexo8} from "../../../models/anexo8";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo8Service} from "../../../services/anexo8.service";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-firmarpostulaciones',
  templateUrl: './firmarpostulaciones.component.html',
  styleUrls: ['./firmarpostulaciones.component.css']
})
export class FirmarpostulacionesComponent implements OnInit {

  issloading=true;
  isexist?:boolean


  anexo8:Anexo8[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo8[]>;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo8Service:Anexo8Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo8Service.getAnexo8byCedula(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo8=value;
        this.issloading=false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
      })
    })
  }
  filter(value: any): Anexo8[] {
    //console.log(value)
    const filterValue = value.toLowerCase();
    return this.anexo8.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.numeroHoras?.toLocaleLowerCase().includes(filterValue)
    );
  }


  firmarAceptacion(anexo8:Anexo8){
    if(anexo8.num_proceso==2){
      Swal.fire({
        title: 'Finalizado',
        text: 'Se ha finalizado el proceso de aceptación',
        color: "#050000",
        confirmButtonColor:"#0086ff",
        background: "#ffffff",
      })
    }else {
      Swal.fire({
        allowOutsideClick: false,
        allowEnterKey:false,
        allowEscapeKey:false,
        title: 'Firma de Documentos',
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: 'Salir',
        confirmButtonText: 'Descargar Documento',
        denyButtonText: `Continuar con la Firma`,
        denyButtonColor: "#3cb227",
        color: "#000000",
        confirmButtonColor: "#0087ff",
        background: "#ffffff",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.convertFile(anexo8.documento);
        } else if (result.isDenied) {
          const {value: file} = await Swal.fire({
            allowOutsideClick: false,
            allowEnterKey:false,
            allowEscapeKey:false,
            showCancelButton: true,
            confirmButtonText:"ENVIAR ACEPTACIÓN",
            color: "#000000",
            confirmButtonColor: "#3cb227",
            background: "#ffffff",
            title: 'Confirmación',
            text: 'Debe subir el documento en formato PDF.',
            input: 'file',
            inputAttributes: {
              'accept': 'application/pdf',
              'aria-label': 'Debe subir la convocatoria en formato PDF'
            },
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === null) {
                  resolve('Es necesario que seleccione el PDF del anexo')
                } else {
                  getBase64(value).then(docx => {
                    anexo8.documento=docx+"";
                    anexo8.num_proceso=2;
                    this.anexo8Service.updateAnexo8(anexo8).subscribe(value1 => {
                      Swal.fire({
                        title: 'Proceso de postulacion exitoso',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                    },error => {
                      Swal.fire({
                        title: 'error',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                    })
                  })
                }
              })
            }
          })
        }
      })
    }

  }


  convertFile(docum:any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo8.pdf');
    //console.log(file);
    saveAs(file, 'Anexo8.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


}
