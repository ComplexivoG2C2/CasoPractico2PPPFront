import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {EmpresaService} from "../../../services/empresa.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {map, Observable, startWith} from "rxjs";
import {Anexo6} from "../../../models/anexo6";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
@Component({
  selector: 'app-anexo6listar',
  templateUrl: './anexo6listar.component.html',
  styleUrls: ['./anexo6listar.component.css']
})
export class Anexo6listarComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  cedula?:String;

  anexo6?:Anexo6[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo6[]>;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo8Service:Anexo8Service,
              private anexo1Service:Anexo1Service,
              private anexo6Service:Anexo6Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo6Service.getAnexo6All().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera).length!=0;
          this.anexo6=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera)
          //  console.log(this.anexo5)
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
        })
      })
    })
  }
  filter(value: any): Anexo6[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexo6.filter(option => option.nombrerol?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreDocenteReceptor?.toLocaleLowerCase().includes(filterValue)
      ||option.nonbreDocenteEmisor?.toLocaleLowerCase().includes(filterValue)
      ||option.siglasCarrera?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
    );
  }



  eliminarAnexo(anexo:Anexo6){
    this.issloading=true;
    this.anexo6Service.deleteAnexo6(anexo.id).subscribe(value => {
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
    var file = this.dataURLtoFile(docum, 'Anexo6.pdf');
    // console.log(file);
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
