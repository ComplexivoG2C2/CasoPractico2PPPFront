import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {DateAdapter} from "@angular/material/core";

import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {map, Observable, startWith} from "rxjs";
import {Materias} from "../../../models/materias";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {MatSelectionListChange} from "@angular/material/list";
import {RegistroConvenio, ActividadEconomicaRuc, ActividadesRealizar} from "../../../models/registroConvenio";
import {RegistroConvenioService} from "../../../services/registro-convenio.service";
import {FechaempService} from "../../../services/fechaemp.service";
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
  selector: 'app-registro-convenio',
  templateUrl: './registro-convenio.component.html',
  styleUrls: ['./registro-convenio.component.css']
})
export class RegistroConvenioComponent implements OnInit {
  pipe: DatePipe = new DatePipe('en-US')

  issloading = true;
  isLinear = true;
  isexist?: boolean;
  activate?: boolean = true;
  activar?: boolean = false;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  //ArrayAntividades
  rows: FormArray;
  itemForm?: FormGroup;

  rows2: FormArray;
  itemForm2?: FormGroup;

  registroConvenio:RegistroConvenio=new RegistroConvenio();
  registroConvenios:RegistroConvenio[]=[];

  data:Date = new Date();
  fechaactual?:Date;

  myControlproyecto = new FormControl();
  myControlanexo7 = new FormControl();
  filteredOptionsProyecto?: Observable<Solicitudproyecto[]>;
  proyectos: Solicitudproyecto[] = [];

  sum = 0;
  numerominimo = 0;

  cedula?: String;

  constructor(
    private router: Router,
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private empresaS: EmpresaService,
    private _adapter: DateAdapter<any>,
    private registroConvenioService:RegistroConvenioService,
    //private fechaempService:FechaempService,
    private cordinadorvinculacionService:CordinadorvinculacionService,
  ) {
    this._adapter.setLocale('es-ec');

    this.rows2 = this._formBuilder.array([]);
    this.rows = this._formBuilder.array([]);

  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      // fechaS:['',Validators.required],
      // titulo:['',Validators.required],
      // nombreRepresentanteE:['', Validators.required],
      // cargo: ['',Validators.required],
      // empresa: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      // fechaE:['',Validators.required],
      // responsablePPP:['',Validators.required],
      // carrera:['',Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      // docx:['',Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      // docx:['',Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      // docx:['',Validators.required]
    });

    //this.fechaempService.getSysdate().subscribe(value => {
    //   this.fechaactual=value.fecha;
    // })

//ArrayActividades
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);
    //Arraycronograma
    // this.thirtdFormGroup.get("items_value")?.setValue("yes");
    // this.thirtdFormGroup.addControl('rows', this.rows);
    //ArrayActividades


  }

  //ArrayActividades
  onAddRow(actividadesRuc:ActividadEconomicaRuc) {
    this.rows.push(this.createItemFormGroup(actividadesRuc));
    this.rows.getRawValue().forEach(element => {
      console.log(element)
    })
    //console.log(this.rows.getRawValue())
  }

  createItemFormGroup(actividadesRuc:ActividadEconomicaRuc): FormGroup {
    return this._formBuilder.group({
      id:actividadesRuc?.id,
      codActividad:actividadesRuc?.codActividad,
      actividades:actividadesRuc?.actividades,
    });
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
    this.rows.getRawValue().forEach(element => {
      console.log(element)
    })
  }

  eliminarActividad(actividades:ActividadEconomicaRuc){
    console.log(this.registroConvenio.id,actividades.id)
    this.registroConvenioService.deleteRegistroConvenio(this.registroConvenio.id).subscribe(data=>{
      Swal.fire({
        title: 'Actividad eliminada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    },err=>{
      Swal.fire({
        title: 'Error',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    })
  }


}
