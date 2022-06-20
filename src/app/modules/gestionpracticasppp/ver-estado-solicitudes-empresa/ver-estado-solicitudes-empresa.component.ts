import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo4} from "../../../models/anexo4";
import {Anexo31} from "../../../models/anexo31";
import {saveAs} from "file-saver";
import {ActivatedRoute, Router} from "@angular/router";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {FechaempService} from "../../../services/fechaemp.service";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";

@Component({
  selector: 'app-ver-estado-solicitudes-empresa',
  templateUrl: './ver-estado-solicitudes-empresa.component.html',
  styleUrls: ['./ver-estado-solicitudes-empresa.component.css']
})
export class VerEstadoSolicitudesEmpresaComponent implements OnInit {

  issloading=true;
  isexist1?:boolean
  isexist2?:boolean
  myControla = new FormControl();
  filteredOptionsa?: Observable<Anexo4[]>;
  myControlr = new FormControl();
  filteredOptionsr?: Observable<Anexo31[]>;
  idEmpresa?:Number;
  fechaactual?:Date;
  proyecto:Solicitudproyecto[]=[];
  nombreEmp?:String;
  anexo4aceptadas:Anexo4[]=[];
  anexo31rechazados:Anexo31[]=[];

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private activatedRoute: ActivatedRoute,

              private _adapter: DateAdapter<any>,
              private fechaempService:FechaempService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let emp = params['emp']
      this.idEmpresa=id;
      this.nombreEmp = emp;
      console.log(this.idEmpresa+"ide empresa")
      this.fechaempService.getSysdate().subscribe(value => {
        this.fechaactual = value.fecha;
      })
      // this.cargarpostulaiones(id);
      // this.cargarpostulaiones2(id);
    })
  }

  cargarpostulaiones(id:Number){
    // this.empresaService.getEmpresaAll().subscribe(value => {
    //   this.proyectoService.getSolicitudes().subscribe(value => {
    //     this.proyecto = value.filter(value2 => value2.nombreempresa == this.nombreEmp && value2.estado == true);
    //     this.anexo4Service.getAnexo4().subscribe(value => {
    //       this.anexo4aceptadas = value;
    //       this.isexist1 = value.length != 0;
    //       console.log(this.anexo4aceptadas + 'aaaaaaaaaaaa' + this.isexist1)
    //       this.issloading = false;
    //       // @ts-ignore
    //       this.filteredOptionsa = this.myControla.valueChanges.pipe(
    //         startWith(''),
    //         map(values => this.filtera(values)),
    //       );
    //     })
    //   })
    // })
    // this.anexo4Service.getAnexoByidProyecto(id).subscribe(value => {
    //   this.proyectoService.getSolicitudes().subscribe(value1 => {
    //     this.proyecto=value1.filter(value1=>value.nombreEmpresa==this.nombreEmp);
    //     this.anexo4Service.getAnexo4().subscribe(value => {
    //       this.anexo4aceptadas=value;
    //       this.isexist1=value.length!=0;
    //       console.log(this.anexo4aceptadas+'aaaaaaaaaaaa'+this.isexist1)
    //       this.issloading=false;
    //       // @ts-ignore
    //       this.filteredOptionsa = this.myControla.valueChanges.pipe(
    //         startWith(''),
    //         map(values=>this.filtera(values)),
    //       );
    //     })
    //   })
    // })
  }

  cargarpostulaiones2(id:String){
    // this.empresaService.getEmpresaAll().subscribe(value => {
    // this.proyectoService.getSolicitudes().subscribe(value1 => {
    //   this.proyecto=value1.filter(value2=>value2.nombreempresa==this.nombreEmp&&value2.estado==true);
    //   this.anexo31Service.getAnexo31().subscribe(value => {
    //     this.anexo31rechazados=value;
    //
    //     this.isexist2=value.length!=0;
    //     this.issloading=false;
    //     // @ts-ignore
    //     console.log(this.anexo31rechazados+'ffffff'+this.isexist2)
    //     this.filteredOptionsr = this.myControlr.valueChanges.pipe(
    //       startWith(''),
    //       map(values=>this.filterr(values)),
    //     );
    //   })
    // })
    // })
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
