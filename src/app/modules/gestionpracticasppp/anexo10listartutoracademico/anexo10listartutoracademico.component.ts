import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo10} from "../../../models/anexo10";
import {FechaService} from "../../../services/fecha.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CarrerasService} from "../../../services/carreras.service";
import {Anexo10Service} from "../../../services/anexo10.service";
import {DateAdapter} from "@angular/material/core";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-anexo10listartutoracademico',
  templateUrl: './anexo10listartutoracademico.component.html',
  styleUrls: ['./anexo10listartutoracademico.component.css']
})
export class Anexo10listartutoracademicoComponent implements OnInit {


  issloading = true;
  isexist?: boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo10[]>;
  cedula?: String;
  nombre?: String;
  anexos10: Anexo10[] = [];

  constructor(private fechaService: FechaService, private carrerasService: CarrerasService,
              private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,
              private anexo10Service: Anexo10Service,
              private _adapter: DateAdapter<any>,
              private router: Router,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
      // console.log(cedula)
      this.anexo10Service.getAnexo10().subscribe(anex61 => {
        this.anexos10 = anex61.filter(value => value.tutorAcademico == nombre);

        this.isexist = anex61.length != 0;
        this.issloading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.anexos10)
      })
    })

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }

  filter(value: any): Anexo10[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexos10.filter(option => option.nombreEmpresa?.toLocaleLowerCase().includes(filterValue)
      || option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  eliminarAnexo10(anexo10: Anexo10) {
    this.issloading = true;
    this.anexo10Service.deleteAnexo10(anexo10.id).subscribe(value => {
      Swal.fire({
        title: 'Eliminado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    }, error => {
      Swal.fire({
        title: 'no eliminado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading = false;
      window.location.reload();
    })
    this.issloading=false;
  }
  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum:any){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }

  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo10.pdf');
    //console.log(file);
    saveAs(file, 'Anexo10.pdf');
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
