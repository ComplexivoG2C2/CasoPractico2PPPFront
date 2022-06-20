import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import {Anexo1} from "../../../models/anexo1";
import Swal from "sweetalert2";
import {map, Observable, startWith} from "rxjs";
import {Anexo6} from "../../../models/anexo6";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo6Service} from "../../../services/anexo6.service";

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-anexo6consultartutoracademico',
  templateUrl: './anexo6consultartutoracademico.component.html',
  styleUrls: ['./anexo6consultartutoracademico.component.css']
})
export class Anexo6consultartutoracademicoComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo6[]>;
  anexo6:Anexo6[]=[];

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
              private anexo4Service:Anexo31y4respuestasService,
              private anexo1Service:Anexo1Service,
              private anexo6Service:Anexo6Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo6Service.getAnexo6byCedula(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo6=value;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
      })
    })
  }

  filter(value: any): Anexo6[] {
    const filterValue = value.toLowerCase();
    return this.anexo6.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreDocenteReceptor?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async update(anexo1: Anexo1) {
    const {value: file} = await Swal.fire({
      allowOutsideClick: false,
      title: 'SELECCIONE EL PDF',
      text: 'Debe subir la covocataria en tipo PDF',
      input: 'file',
      color: "#030000",
      confirmButtonColor:"#0088ff",
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
              anexo1.documento = docx + '';
              anexo1.numProceso=2;
              this.anexo6Service.updateAnexo6(anexo1).subscribe(value1 => {
                Swal.fire({
                  title: 'Documento actualizado',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
              },error => {
                Swal.fire({
                  title: 'Firmar para dejar constancia',
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

  //convert a pdf
  convertFile(docum:any) {
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo6.pdf');
    saveAs(file, 'Anexo6.pdf');
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

