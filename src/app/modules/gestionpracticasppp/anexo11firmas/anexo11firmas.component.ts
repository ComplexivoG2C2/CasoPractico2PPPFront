import { Component, OnInit } from '@angular/core';
import {Anexo9} from "../../../models/anexo9";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo9tutorempService} from "../../../services/anexo9tutoremp.service";
import Swal from "sweetalert2";
import {saveAs} from "file-saver";
import {Anexo11} from "../../../models/anexo11";
import {Anexo11tutorempService} from "../../../services/anexo11tutoremp.service";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


@Component({
  selector: 'app-anexo11firmas',
  templateUrl: './anexo11firmas.component.html',
  styleUrls: ['./anexo11firmas.component.css']
})
export class Anexo11firmasComponent implements OnInit {


  issloading = true;
  isexist?: boolean;
  panelOpenState = false;

  anexo11: Anexo11[] = [];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo11[]>;
  cedula?: String;
  nombres?: String;

  constructor(private router: Router, private fechaService: FechaService, private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService, private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo11Service: Anexo11tutorempService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let nombres = params['nombres']
      this.nombres = nombres;
      console.log("nombre del tutor empresarial" + this, nombres)
      this.anexo11Service.getAll().subscribe(value => {
        this.isexist = value.length != 0;
        this.anexo11 = value.filter(value2 => value2.nombretutoremp == nombres);
        console.log(value + "si hay datos");

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.issloading = false;
        //console.log(value)
      })
    })
  }

  filter(value: any): Anexo11[] {
    const filterValue = value.toLowerCase();
    return this.anexo11.filter(option => option.nombretutoremp?.toLocaleLowerCase().includes(filterValue)
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaest?.toLocaleLowerCase().includes(filterValue)
      || option.nombreest?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async update(anexo11: Anexo11) {
    const {value: file} = await Swal.fire({
      allowOutsideClick: false,
      title: 'SELECCIONE EL PDF',
      text: 'Debe subir el documento en tipo PDF',
      input: 'file',
      color: "#090000",
      confirmButtonColor: "#0085ff",
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
              anexo11.documento = docx + '';
              this.anexo11Service.updateAnexo11(anexo11).subscribe(value1 => {
                Swal.fire({
                  title: 'Documento subido',
                  color: "#070000",
                  confirmButtonColor: "#0089ff",
                  background: "#ffffff",
                })
              }, error => {
                Swal.fire({
                  title: 'Error',
                  text: 'No se firmo el documento. ' + error.error.message,
                  icon: 'warning',
                  color: "#000000",
                  confirmButtonColor: "#0084ff",
                  background: "#ffffff",
                })
              })
              console.log(anexo11)
            })
          }
        })
      }
    })

  }

  //convert a pdf
  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo11.pdf');
    // console.log(file);
    saveAs(file, 'Anexo11.pdf');
  }

  dataURLtoFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }
}
