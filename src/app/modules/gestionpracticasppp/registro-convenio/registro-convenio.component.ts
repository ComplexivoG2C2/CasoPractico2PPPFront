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
import {MatSelectChange} from "@angular/material/select";
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
  sixthFormGroup!: FormGroup;
  seventhFormGroup!: FormGroup;
  eighthFormGroup!: FormGroup;


  //ArrayAntividades
  rows: FormArray;
  itemForm?: FormGroup;

  rows2: FormArray;
  itemForm2?: FormGroup;
  registroConvenio2:RegistroConvenio = new RegistroConvenio();
  registroConvenio1:RegistroConvenio=new RegistroConvenio();
  registroConvenios:RegistroConvenio[]=[];

  data:Date = new Date();
  fechaactual?:Date;

  filteredOptionsProyecto?: Observable<Solicitudproyecto[]>;
  proyectos: Solicitudproyecto[] = [];

  naturaleza?:String;
  carrera?:String;
  cedula?:String;

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
// this.secondFormGroup=this._formBuilder.group({});
//     this.seventhFormGroup=this._formBuilder.group({});
//     this.rows2 = this._formBuilder.array([]);
//     this.rows = this._formBuilder.array([]);
this.secondFormGroup=this._formBuilder.group({
  items:[null,Validators.required],
  items_value:['no',Validators.required],
});
    this.rows = this._formBuilder.array([]);

    this.seventhFormGroup=this._formBuilder.group({
  items:[null,Validators.required],
  items_value:['no',Validators.required],
});
    this.rows2 = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
    },1000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
let cedula=params['cedula']
      this.cedula=cedula;
console.log("si funciona"+ this.cedula);
    })

    this.firstFormGroup = this._formBuilder.group({
       a:['',Validators.required],
       b:['',Validators.required],
      c:['',Validators.required],
      d:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({
      e:['',Validators.required],
      f:['',Validators.required],
      g:['',Validators.required],
      h:['',Validators.required],
      i:['',Validators.required],
      j:['',Validators.required],
      k:['',Validators.required],
      l:['',Validators.required],
      m:['',Validators.required],
      n:['',Validators.required],
      o:['',Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      p:['',Validators.required],
      q:['',Validators.required],
      r:['',Validators.required],
      s:['',Validators.required],
      t:['',Validators.required],
      u:['',Validators.required],
      v:['',Validators.required],
      w:['',Validators.required],
      x:['',Validators.required],
      y:['',Validators.required],
      z:['',Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      // docx:['',Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      a1:['',Validators.required],
      b2:['',Validators.required],
      c3:['',Validators.required],
    });
    this.seventhFormGroup = this._formBuilder.group({
      // docx:['',Validators.required]
    });
    this.eighthFormGroup = this._formBuilder.group({
      d4:['',Validators.required],
      f5:['',Validators.required],

      g6:['',Validators.required],
    });

    //this.fechaempService.getSysdate().subscribe(value => {
    //   this.fechaactual=value.fecha;
    // })

//ArrayActividades
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);

    this.seventhFormGroup.get("items_value")?.setValue("yes");
    this.seventhFormGroup.addControl('rows2', this.rows2);
    //Arraycronograma
    // this.thirtdFormGroup.get("items_value")?.setValue("yes");
    // this.thirtdFormGroup.addControl('rows', this.rows);
    //ArrayActividades
console.log("analizar")
this.issloading=false;
  }

  //ArrayActividades
  onAddRow(codActividad:String) {
    this.rows.push(this.createItemFormGroup(codActividad));
    //console.log(this.rows.getRawValue())
  }

  onAddRow2(actividadesRealizar:String) {
    this.rows2.push(this.createItemFormGroup2(actividadesRealizar));
    //console.log(this.rows2.getRawValue())
  }

  createItemFormGroup(codActividad:String): FormGroup {
    return this._formBuilder.group({
      codActividad:[codActividad,Validators.required],
      actividades:['',Validators.required]
    });
  }

  createItemFormGroup2(actividadesRealizar:String): FormGroup {
    return this._formBuilder.group({
      actividadesRealizar:[actividadesRealizar,Validators.required]
    });
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
    this.rows.getRawValue().forEach(element => {
      console.log(element)
    })
  }

  onRemoveRow2(rowIndex:number){
    this.rows2.removeAt(rowIndex)
    this.rows2.getRawValue().forEach(element => {
      console.log(element)
    })
  }

   obtenerDatos():RegistroConvenio{

   /*  this.registroConvenio2.codigoInforme=this.registroConvenio1.codigoInforme;
    this.registroConvenio2.anioInforme=this.registroConvenio1.anioInforme;
    this.registroConvenio2.fechaConvenio=this.registroConvenio1.fechaConvenio;
    this.registroConvenio2.nombreEmpresa=this.registroConvenio1.nombreEmpresa;
   this.registroConvenio2.naturalezaEntidad=this.registroConvenio1.naturalezaEntidad;
   this.registroConvenio2.nombreRepreEmpresa=this.registroConvenio1.nombreRepreEmpresa;
    this.registroConvenio2.rucEmpresa=this.registroConvenio1.rucEmpresa;
  */
    this.registroConvenio2.actividadEconomicaRuc=this.rows.getRawValue();

  /*  this.registroConvenio2.anioConvenio=this.registroConvenio1.anioConvenio;
     this.registroConvenio2.nroEstudiantes=this.registroConvenio1.nroEstudiantes;
     this.registroConvenio2.totalEstudiantes=this.registroConvenio1.totalEstudiantes;
     this.registroConvenio2.nombreTutorAcademico=this.registroConvenio1.nombreTutorAcademico;
    this.registroConvenio2.nombreEmpresa=this.registroConvenio1.nombreEmpresa;
    this.registroConvenio2.tlfTutorA=this.registroConvenio1.tlfTutorA;
    this.registroConvenio2.nombreTutorEmpresa=this.registroConvenio1.nombreTutorEmpresa;
     this.registroConvenio2.cargoTutorEmpresa=this.registroConvenio1.cargoTutorEmpresa;
    this.registroConvenio2.tlfTutorEmpresa=this.registroConvenio1.tlfTutorEmpresa;*/
    this.registroConvenio2.actividadesRealizars=this.rows2.getRawValue();
     return this.registroConvenio2;
   }

  obtenerGestion(event:MatSelectChange){
this.naturaleza=this.registroConvenio2.naturalezaEntidad;
  }

  obtenerCarrera(event:MatSelectChange){
    this.carrera=this.registroConvenio2.carrera;
  }


   guardar(){
  this.registroConvenio2 =this.obtenerDatos();
     this.registroConvenioService.saveRegistroConvenio(this.obtenerDatos()).subscribe(datos=>{
       // console.log(">."+this.anexo8Service.saveAnexo8(this.ontnerDatos()))
       Swal.fire({
        title: 'Actividad Registrada....',
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
        title: 'La fecha no puede repetirse',
         showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
        hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
        }
       })
     })

   }

  // eliminarActividad(actividades:ActividadEconomicaRuc){
  //   console.log(this.registroConvenio.id,actividades.id)
  //   this.registroConvenioService.deleteRegistroConvenio(this.registroConvenio.id).subscribe(data=>{
  //     Swal.fire({
  //       title: 'Actividad eliminada',
  //       showClass: {
  //         popup: 'animate__animated animate__fadeInDown'
  //       },
  //       hideClass: {
  //         popup: 'animate__animated animate__fadeOutUp'
  //       }
  //     })
  //     window.location.reload();
  //   },err=>{
  //     Swal.fire({
  //       title: 'Error',
  //       showClass: {
  //         popup: 'animate__animated animate__fadeInDown'
  //       },
  //       hideClass: {
  //         popup: 'animate__animated animate__fadeOutUp'
  //       }
  //     })
  //     window.location.reload();
  //   })
  // }


}
