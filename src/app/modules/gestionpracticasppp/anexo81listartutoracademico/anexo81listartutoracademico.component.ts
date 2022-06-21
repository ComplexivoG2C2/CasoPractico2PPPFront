import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo6} from "../../../models/anexo6";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";

import {saveAs} from "file-saver";
import {Anexo81Service} from "../../../services/anexo81.service";
import {Anexo81} from "../../../models/anexo81";
import {DomSanitizer} from "@angular/platform-browser";
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-anexo81listartutoracademico',
  templateUrl: './anexo81listartutoracademico.component.html',
  styleUrls: ['./anexo81listartutoracademico.component.css']
})
export class Anexo81listartutoracademicoComponent implements OnInit {





  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo81[]>;
  anexo81:Anexo81[]=[];

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo81Service:Anexo81Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo81Service.getAnexo81byCedula(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo81=value;

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
      })
    })
  }

  filter(value: any): Anexo81[] {
    const filterValue = value.toLowerCase();
    return this.anexo81.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
      ||option.nombreTutoracademico?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
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
    var file = this.dataURLtoFile(docum, 'Anexo8_1.pdf');
    saveAs(file, 'Anexo8_1.pdf');
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
