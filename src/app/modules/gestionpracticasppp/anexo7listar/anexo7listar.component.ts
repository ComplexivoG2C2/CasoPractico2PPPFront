import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo7} from "../../../models/anexo7";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo7Service} from "../../../services/anexo7.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";

// @ts-ignore
import { saveAs } from "file-saver";

@Component({
  selector: 'app-anexo7listar',
  templateUrl: './anexo7listar.component.html',
  styleUrls: ['./anexo7listar.component.css']
})
export class Anexo7listarComponent implements OnInit {



  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  anexo7?:Anexo7[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo7[]>;

  cedula?:String;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo4Service:Anexo31y4respuestasService,
              private anexo1Service:Anexo1Service,
              private anexo7Service:Anexo7Service,
              private cordinadorvinculacionService:CordinadorvinculacionService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo7Service.getAnexo7().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera).length!=0;
          this.anexo7=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera)
           console.log(this.anexo7)
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
        })
      })
    })
  }
  filter(value: any): Anexo7[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexo7.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreEmpresa?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreTutoracademico?.toLocaleLowerCase().includes(filterValue)
    );
  }

  eliminarAnexo(anexo:Anexo7){
    this.issloading=true;
    this.anexo7Service.deleteAnexo7(anexo.id).subscribe(value => {
      Swal.fire({
        title: 'eliminado.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
      this.issloading=false;
    },error => {
      Swal.fire({
        title: 'Acta de reunion no se eliminada',
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
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo7.pdf');
    // console.log(file);
    saveAs(file, 'Anexo7.pdf');
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
