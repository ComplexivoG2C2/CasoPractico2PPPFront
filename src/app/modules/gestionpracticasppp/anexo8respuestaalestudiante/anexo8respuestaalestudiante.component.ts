import { Component, OnInit } from '@angular/core';
import {map, Observable, startWith} from "rxjs";
// @ts-ignore
import { saveAs } from "file-saver";
import {Anexo8} from "../../../models/anexo8";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-anexo8respuestaalestudiante',
  templateUrl: './anexo8respuestaalestudiante.component.html',
  styleUrls: ['./anexo8respuestaalestudiante.component.css']
})
export class Anexo8respuestaalestudianteComponent implements OnInit {

  panelOpenState = false;
  issloading=true;
  isexist?:boolean
  anexo8:Anexo8[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo8[]>;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder
              ,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo8Service:Anexo8Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo8Service.getAnexo8All().subscribe(value1 =>  {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera&&value2.num_proceso==2).length!=0;
          this.anexo8=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera&&value2.num_proceso==2);
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
          this.issloading=false;
          // console.log(this.anexo4)
        })
      })
    })
  }
  filter(value: any): Anexo8[] {
    const filterValue = value.toLowerCase();
    return this.anexo8.filter(option => option.siglasCarrera?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRepresentante?.toLocaleLowerCase().includes(filterValue)
    );
  }
  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum:any){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }
  convertFile(docum:any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo8.pdf');
    //console.log(file);
    saveAs(file, 'Anexo8.pdf');
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
