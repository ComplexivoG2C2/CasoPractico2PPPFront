import {Component, OnInit, ViewChild} from '@angular/core';
import {Anexo3} from "../../../models/anexo3";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo8} from "../../../models/anexo8";
import {DatePipe} from "@angular/common";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {Anexo2} from "../../../models/anexo2";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
import {Anexo31} from "../../../models/anexo31";
import {Anexo4} from "../../../models/anexo4";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {Anexo31Service} from "../../../services/anexo31.service";

function loadFile(url:any, callback:any) {
  PizZipUtils.getBinaryContent(url, callback);
}
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



@Component({
  selector: 'app-anexo31y4listar',
  templateUrl: './anexo31y4listar.component.html',
  styleUrls: ['./anexo31y4listar.component.css']
})
export class Anexo31y4listarComponent implements OnInit {

  issloading=true;
  isexist1?:boolean
  isexist2?:boolean
  anexo4aceptadas:Anexo4[]=[];
  anexo31rechazados:Anexo31[]=[];

  cedula?:String;

  proyecto:Solicitudproyecto[]=[];



  myControla = new FormControl();
  filteredOptionsa?: Observable<Anexo4[]>;
  myControlr = new FormControl();
  filteredOptionsr?: Observable<Anexo31[]>;

  constructor(private router: Router,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,

              private _adapter: DateAdapter<any>,
              private anexo31Service:Anexo31Service,
              private anexo4Service:Anexo31y4respuestasService,) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula
      this.cargarpostulaiones(cedula);
      this.cargarpostulaiones2(cedula);
    })
  }

  cargarpostulaiones(cedula:String){
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.codigocarrera==value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera&&value2.estado==true);
        this.anexo4Service.getAnexo4().subscribe(value => {
          this.anexo4aceptadas=value;
          this.isexist1=value.length!=0;
          console.log(this.anexo4aceptadas+'aaaaaaaaaaaa'+this.isexist1)
          this.issloading=false;
          // @ts-ignore
          this.filteredOptionsa = this.myControla.valueChanges.pipe(
            startWith(''),
            map(values=>this.filtera(values)),
          );
        })
      })
  })
  }
  cargarpostulaiones2(cedula:String){
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.codigocarrera==value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera&&value2.estado==false);
        this.anexo31Service.getAnexo31().subscribe(value => {
          this.anexo31rechazados=value;

          this.isexist2=value.length!=0;
          this.issloading=false;
          // @ts-ignore
          console.log(this.anexo31rechazados+'ffffff'+this.isexist2)
          this.filteredOptionsr = this.myControlr.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterr(values)),
          );
        })
      })

    })
  }


  filtera(value: any): Anexo4[] {
    const filterValue = value.toLowerCase();
    return this.anexo4aceptadas.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
    );
  }
  filterr(value: any): Anexo31[] {
    const filterValue = value.toLowerCase();
    return this.anexo31rechazados.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
    );
  }


  convertFile31(docum:any) {
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo31.pdf');
    // console.log(file);
    saveAs(file, 'Anexo31.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });

    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

  }


  convertFile4(docum:any) {
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile4(docum, 'Anexo4.pdf');
    // console.log(file);
    saveAs(file, 'Anexo4.pdf');
  }
  dataURLtoFile4(dataurl:any, filename:any) {
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });

    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }

}
