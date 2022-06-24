import { Component, OnInit } from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {Anexo5} from "../../../models/anexo5";
import {saveAs} from "file-saver";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {Anexo5tutorempresaService} from "../../../services/anexo5tutorempresa.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Anexo5Service} from "../../../services/anexo5.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ProyectoService} from "../../../services/proyecto.service";
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-anexo5listarcoordinacion',
  templateUrl: './anexo5listarcoordinacion.component.html',
  styleUrls: ['./anexo5listarcoordinacion.component.css']
})
export class Anexo5listarcoordinacionComponent implements OnInit {
  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo5[]>;
  anexo5:Anexo5[]=[];
cedula?:String;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,private responsablepppService:ResponsablepppService,
              private anexo5Service:Anexo5Service,private sanitizer: DomSanitizer,private proyectoService:ProyectoService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula = cedula;
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getSolicitudes().subscribe(value1 => {
      this.anexo5Service.getAnexo5All().subscribe(anexo5 => {
        this.isexist=anexo5.length!=0;
        this.anexo5=anexo5.filter(fil => fil.siglascarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera)
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

filter(value: any): Anexo5[] {
  const filterValue = value.toLowerCase();
  return this.anexo5.filter(option => option.nombreEst?.toLowerCase().includes(filterValue)
    ||option.cedulaEst?.toLocaleLowerCase().includes(filterValue)
    ||option.siglascarrera?.toLocaleLowerCase().includes(filterValue)
  );
}

safeUrl: any;
//url 2 where the need to use an add
getSafeUrl(docum:any){
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
}

//convert a pdf
convertFile(docum:any) {
  //Usage example:
  var file = this.dataURLtoFile(docum, 'Anexo5.pdf');
  saveAs(file, 'Anexo5.pdf');
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
