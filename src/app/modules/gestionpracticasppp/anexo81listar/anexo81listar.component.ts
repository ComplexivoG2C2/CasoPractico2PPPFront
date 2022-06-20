import { Component, OnInit } from '@angular/core';
import {Anexo6} from "../../../models/anexo6";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import Swal from "sweetalert2";
import {saveAs} from "file-saver";
import {Anexo81Service} from "../../../services/anexo81.service";
import {Anexo81} from "../../../models/anexo81";

@Component({
  selector: 'app-anexo81listar',
  templateUrl: './anexo81listar.component.html',
  styleUrls: ['./anexo81listar.component.css']
})
export class Anexo81listarComponent implements OnInit {


  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  cedula?:String;

  anexo81?:Anexo81[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo81[]>;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo81Service:Anexo81Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo81Service.getAnexo81().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera).length!=0;
          this.anexo81=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera)
          console.log(this.anexo81)
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
        })
      })
    })
  }
  filter(value: any): Anexo81[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexo81.filter(option => option.nombreResponsable?.toLowerCase().includes(filterValue)
      ||option.nombreEmpresa?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreTutoracademico?.toLocaleLowerCase().includes(filterValue)
    );
  }



  eliminarAnexo(anexo:Anexo6){
    this.issloading=true;
    this.anexo81Service.deleteAnexo81(anexo.id).subscribe(value => {
      Swal.fire({
        title: 'eliminado..',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading=false;
    },error => {
      Swal.fire({
        title: 'error..',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading=false;
    })
  }

  convertFile(docum:any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo8_1.pdf');
    // console.log(file);
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

