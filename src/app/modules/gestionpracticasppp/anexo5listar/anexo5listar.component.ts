import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from "file-saver";
import {Anexo5} from "../../../models/anexo5";
import {Anexo5tutorempresaService} from "../../../services/anexo5tutorempresa.service";
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-anexo5listar',
  templateUrl: './anexo5listar.component.html',
  styleUrls: ['./anexo5listar.component.css']
})
export class Anexo5listarComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo5[]>;
  anexo5:Anexo5[]=[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo5Service:Anexo5tutorempresaService,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.anexo5Service.getAnexo5bynombre(nombre).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo5=value;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
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
