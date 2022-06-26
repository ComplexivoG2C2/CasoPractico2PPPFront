import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo7} from "../../../models/anexo7";
import {map, Observable, startWith} from "rxjs";
import {ProyectoService} from "../../../services/proyecto.service";
import {DateAdapter} from "@angular/material/core";
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
  selector: 'app-anexo7firmar',
  templateUrl: './anexo7firmar.component.html',
  styleUrls: ['./anexo7firmar.component.css']
})
export class Anexo7firmarComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  anexo7:Anexo7[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo7[]>;
  cedula?: String;
  nombres?: String;

  constructor(private router: Router, private fechaService:FechaService, private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService, private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo7Service:Anexo7tutorempService) {
    this._adapter.setLocale('es-ec');
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let nombres=params['nombres']
      this.nombres=nombres;
      console.log('nombres'+this.nombres)
      this.anexo7Service.getAnexo7().subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo7 = value.filter(value => value.nombreTutorEmp==nombres);

        console.log(value+"si hay datos");
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
        //console.log(value)
      })
    })
  }

  filter(value: any): Anexo7[] {
    const filterValue = value.toLowerCase();
    return this.anexo7.filter(option => option.nombreTutoracademico
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
      || option.nombreEmpresa?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async update(anexo7: Anexo7) {
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
              anexo7.documento = docx + '';
              this.anexo7Service.updateanexo7(anexo7).subscribe(value1 => {
                Swal.fire({
                  title: 'Documento subido',
                  color: "#070000",
                  confirmButtonColor:"#0089ff",
                  background: "#ffffff",
                })
                this.router.navigate(['/paneltutor/gestionpracticasppp/bienvenidatutor'])
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
              console.log(anexo7)
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
    var file = this.dataURLtoFile(docum, 'Anexo7.pdf');
    // console.log(file);
    saveAs(file, 'Anexo7.pdf');
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

