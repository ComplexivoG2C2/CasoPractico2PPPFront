import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo9} from "../../../models/anexo9";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo9Service} from "../../../services/anexo9.service";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from "file-saver";
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-anexo9responsableppp',
  templateUrl: './anexo9responsableppp.component.html',
  styleUrls: ['./anexo9responsableppp.component.css']
})
export class Anexo9responsablepppComponent implements OnInit {


  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo9[]>;
  anexo9:Anexo9[]=[];

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo9Service:Anexo9Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']



      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          this.anexo9Service.getAll().subscribe(anexo9 => {
            this.isexist=anexo9.length!=0;
            this.anexo9=anexo9.filter(fil => fil.siglascarrera == value1.filter(value3 => value3.codigocarrera == value.filter(value4 => value4.cedula == cedula)[0].codigoCarrera)[0].codigocarrera)
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

  filter(value: any): Anexo9[] {
    const filterValue = value.toLowerCase();
    return this.anexo9.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
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
    var file = this.dataURLtoFile(docum, 'Anexo9.pdf');
    saveAs(file, 'Anexo9.pdf');
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
