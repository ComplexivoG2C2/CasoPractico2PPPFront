import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {RegistroConvenioService} from "../../../services/registro-convenio.service";
import {RegistroConvenio} from "../../../models/registroConvenio";
import {Anexo8} from "../../../models/anexo8";
import {Anexo7} from "../../../models/anexo7";
import Swal from "sweetalert2";
// @ts-ignore
import { saveAs } from "file-saver";
import {Anexo7tutorempService} from "../../../services/anexo7tutoremp.service";
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-registroconveniofirmar',
  templateUrl: './registroconveniofirmar.component.html',
  styleUrls: ['./registroconveniofirmar.component.css']
})
export class RegistroconveniofirmarComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;
nombre?:String;

  registroconvenio:RegistroConvenio[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<RegistroConvenio[]>;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private registroservice:RegistroConvenioService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre=params['nombres']
      this.nombre=nombre;
      this.registroservice.getRegistroConvenio().subscribe(value => {
        this.isexist=value.length!=0;
        this.registroconvenio =value;
        this.issloading=false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
      })
    })
  }
  filter(value: any): RegistroConvenio[] {
    //console.log(value)
    const filterValue = value.toLowerCase();
    return this.registroconvenio.filter(option => option.nombreTutorEmpresa?.toLowerCase().includes(filterValue)
      ||option.codigoInforme?.toLocaleLowerCase().includes(filterValue)
      ||option.carrera?.toLocaleLowerCase().includes(filterValue)
    );
  }
  async update(registroconvenio: RegistroConvenio) {
    const {value: file} = await Swal.fire({
      allowOutsideClick: false,
      title: 'SELECCIONE EL PDF',
      text: 'Debe subir el documento en tipo PDF',
      input: 'file',
      color: "#090000",
      confirmButtonColor:"#0085ff",
      background: "#ffffff",
      inputAttributes: {
        'accept': 'application/pdf',
        'aria-label': 'SUBIR PDF FIRMADO'
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === null) {
            resolve('Es necesario que seleccione el PDF')
          } else {
            getBase64(value).then(docx => {
              registroconvenio.documento = docx + '';
              this.registroservice.updateregistro(registroconvenio).subscribe(value1 => {
                Swal.fire({
                  title: 'Documento subido',
                  color: "#070000",
                  confirmButtonColor:"#0089ff",
                  background: "#ffffff",
                })
              },error => {
                Swal.fire({
                  title: 'Error',
                  text: 'No se firmo el documento. '+error.error.message,
                  icon: 'warning',
                  color: "#000000",
                  confirmButtonColor:"#0084ff",
                  background: "#ffffff",
                })
              })
              console.log(registroconvenio)
            })
          }
        })
      }
    })

  }
  //convert a pdf
  convertFile(docum:any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'registroconvenio.pdf');
    // console.log(file);
    saveAs(file, 'registroconvenio.pdf');
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
