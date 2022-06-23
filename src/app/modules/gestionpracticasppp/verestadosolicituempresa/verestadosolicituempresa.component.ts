import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo31} from "../../../models/anexo31";
import {Anexo4} from "../../../models/anexo4";
import {map, Observable, startWith} from "rxjs";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {ProyectoService} from "../../../services/proyecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {MatDialog} from "@angular/material/dialog";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {FechaempService} from "../../../services/fechaemp.service";
import {Anexo31Service} from "../../../services/anexo31.service";
import {saveAs} from "file-saver";
import {EmpresaempService} from "../../../services/empresaemp.service";
import {ProyectoempService} from "../../../services/proyectoemp.service";
import {Anexo31empService} from "../../../services/anexo31emp.service";
import {Anexo4empService} from "../../../services/anexo4emp.service";
@Component({
  selector: 'app-verestadosolicituempresa',
  templateUrl: './verestadosolicituempresa.component.html',
  styleUrls: ['./verestadosolicituempresa.component.css']
})
export class VerestadosolicituempresaComponent implements OnInit {

  issloading = true;
  isexist1?: boolean
  isexist2?: boolean
  myControla = new FormControl();
  filteredOptionsa?: Observable<Anexo4[]>;
  myControlr = new FormControl();
  filteredOptionsr?: Observable<Anexo31[]>;
  idEmpresa?: Number;
  fechaactual?: Date;
  proyecto: Solicitudproyecto[] = [];
  nombreEmp?: String;
  anexo4aceptadas: Anexo4[] = [];
  anexo31rechazados: Anexo31[] = [];
  isLinear = true;

  nombretutor?:String;


  constructor(private router: Router,
              private proyectoService: ProyectoempService,
              private _formBuilder: FormBuilder,
              private empresaService: EmpresaempService,
              private activatedRoute: ActivatedRoute,
              private _adapter: DateAdapter<any>,
              private fechaempService: FechaempService,
              private anexo31Service: Anexo31empService,
              private anexo4Service: Anexo4empService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let emp = params['emp']
      this.idEmpresa = id;
      this.nombreEmp = emp;
      console.log(this.idEmpresa + "ide empresa")
      console.log(this.nombreEmp + "nombreeeee")
      this.fechaempService.getSysdate().subscribe(value => {
        this.fechaactual = value.fecha;
      })
      this.cargarpostulaiones(emp);
      this.cargarpostulaiones2(emp);
    })
  }


  cargarpostulaiones(emp: String) {

        this.anexo4Service.getAnexo4().subscribe(value => {
          this.anexo4aceptadas = value.filter(value5=>value5.nombreEmpresa==emp);
          this.isexist1 = value.length != 0;
          console.log(this.anexo4aceptadas + 'aaaaaaaaaaaa' + this.isexist1)
          this.issloading = false;
          // this.isexist1=true;
          this.filteredOptionsa = this.myControla.valueChanges.pipe(
            startWith(''),
            map(values => this.filtera(values)),
          );
        })


  }

  cargarpostulaiones2(emp: String) {


        this.anexo31Service.getAnexo31().subscribe(value => {
          this.anexo31rechazados = value.filter(value2=>value2.nombreEmpresa==emp);
          this.isexist2 = value.length != 0;
          console.log(this.anexo4aceptadas + 'fffff' + this.isexist2)
          this.issloading = false;
          // this.isexist2=true;
          this.filteredOptionsr = this.myControlr.valueChanges.pipe(
            startWith(''),
            map(values => this.filterr(values)),
          );
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

  convertFile31(docum: any) {
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo31.pdf');
    // console.log(file);
    saveAs(file, 'Anexo31.pdf');
  }

  dataURLtoFile(dataurl: any, filename: any) {
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});

    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});
    }

  }


  convertFile4(docum: any) {
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile4(docum, 'Anexo4.pdf');
    // console.log(file);
    saveAs(file, 'Anexo4.pdf');
  }

  dataURLtoFile4(dataurl: any, filename: any) {
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});

    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});
    }
  }
}
