import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
// @ts-ignore
import { saveAs } from 'file-saver';
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo2} from "../../../models/anexo2";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-verconvocatorias',
  templateUrl: './verconvocatorias.component.html',
  styleUrls: ['./verconvocatorias.component.css']
})
export class VerconvocatoriasComponent implements OnInit {

  issloading = true;
  isexist?: boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo2[]>;
  cedula?: String;

  anexo2: Anexo2[] = [];

  constructor(private router: Router,
              private fechaService: FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService,
              private responsablepppService: ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service: Anexo2Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

    }, 1000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula = cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          this.anexo2Service.getAnexo2().subscribe(anexo2 => {
            this.isexist = anexo2.filter(fil => fil.siglasCarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera).length != 0;
            this.anexo2 = anexo2.filter(fil => fil.siglasCarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera)
            this.issloading = false;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(values => this.filter(values)),
            );
          })
        })
      })
    })
  }

  obtnerdatos(cedula: String) {
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.anexo2Service.getAnexo2().subscribe(anexo2 => {
          this.isexist = anexo2.filter(fil => fil.siglasCarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera).length != 0;
          this.anexo2 = anexo2.filter(fil => fil.siglasCarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera)
          this.issloading = false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values => this.filter(values)),
          );
        })
      })
    })
  }

  filter(value: any): Anexo2[] {
    const filterValue = value.toLowerCase();
    return this.anexo2.filter(option => option.nombreResponsable?.toLowerCase().includes(filterValue)
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
      || option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      || option.empresa?.toLocaleLowerCase().includes(filterValue)
      || option.ciclo?.toLocaleLowerCase().includes(filterValue)
    );
  }


  eliminarAnexo2(anexo: Anexo2) {
    this.issloading = true;
    this.anexo2Service.deleteAnexo2(anexo.id).subscribe(value => {
      Swal.fire({
        title: 'Convocatoria eliminada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.obtnerdatos(this.cedula + "")
      this.router.navigate(['/panelusuario/proyectovinculacion/verconvocatoria', this.cedula]);
    }, error => {
      Swal.fire({
        title: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading = false;
    })
  }

  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum:any){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }
  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo2.pdf');
    // console.log(file);
    saveAs(file, 'ConvocatoriaPPP.pdf');
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
