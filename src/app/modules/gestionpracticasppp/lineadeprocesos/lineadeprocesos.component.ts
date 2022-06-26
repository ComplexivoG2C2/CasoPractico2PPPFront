import { Component, OnInit } from '@angular/core';
import {Anexo4} from "../../../models/anexo4";
import {Anexo31} from "../../../models/anexo31";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo31Service} from "../../../services/anexo31.service";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-lineadeprocesos',
  templateUrl: './lineadeprocesos.component.html',
  styleUrls: ['./lineadeprocesos.component.css']
})
export class LineadeprocesosComponent implements OnInit {


  panelOpenState = true;
  issloading=true;
  isexist1?:boolean
  isexist2?:boolean
  isexist3?:boolean
  anexo4aceptadas:Anexo4[]=[];
  anexo31rechazados:Anexo31[]=[];
 anexopedinte:Anexo31[]=[];

  cedula?:String;

  proyecto:Solicitudproyecto[]=[];



  myControla = new FormControl();
  filteredOptionsa?: Observable<Anexo4[]>;
  myControlr = new FormControl();
  myControlp = new FormControl();
  filteredOptionsr?: Observable<Anexo31[]>;
  filteredOptionsp?: Observable<Anexo31[]>;
  constructor(
    private router: Router,
    private proyectoService:ProyectoService,
    private responsablepppService:ResponsablepppService,
    private _formBuilder: FormBuilder,
    private empresaService:EmpresaService,
    private fechaService:FechaService,
    private activatedRoute: ActivatedRoute,

    private _adapter: DateAdapter<any>,
    private anexo31Service:Anexo31Service,
    private anexo4Service:Anexo31y4respuestasService,
    private sanitizer: DomSanitizer
  ) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula
      this.cargarpostulaiones(cedula);
      this.cargarpostulaiones2(cedula);
      this.cargarpostulaiones3(cedula);
    })
  }

  cargarpostulaiones(cedula:String){

      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.estado==true);
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
  }

  cargarpostulaiones2(cedula:String){

      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.estado==false);
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

  }
  cargarpostulaiones3(cedula:String){

      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.estado==null);
        this.anexo31Service.getAnexo31().subscribe(value => {
          this.anexopedinte=value;

          this.isexist3=value.length!=0;
          this.issloading=false;
          // @ts-ignore
          console.log(this.anexopedinte+'ffffff'+this.isexist3)
          this.filteredOptionsr = this.myControlp.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterp(values)),
          );
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
  filterp(value: any): Anexo31[] {
    const filterValue = value.toLowerCase();
    return this.anexo31rechazados.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
    );
  }


}

