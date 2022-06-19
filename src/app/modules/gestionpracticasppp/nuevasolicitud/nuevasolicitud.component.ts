import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Empresa} from "../../../models/empresa";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmpresaService} from "../../../services/empresa.service";
import {MatSelectChange} from "@angular/material/select";
import {DateAdapter} from "@angular/material/core";

import Docxtemplater from "docxtemplater";
import * as moment from 'moment';
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {DatePipe} from "@angular/common";
import {FechaempService} from "../../../services/fechaemp.service";
import {CarreraempService} from "../../../services/carreraemp.service";
import {ProyectoempService} from "../../../services/proyectoemp.service";
import {ResponsablepppempService} from "../../../services/responsablepppemp.service";

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
  selector: 'app-nuevasolicitud',
  templateUrl: './nuevasolicitud.component.html',
  styleUrls: ['./nuevasolicitud.component.css']
})

export class NuevasolicitudComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  empresa?:String;
  ide?:Number;
  empresas: Empresa = new Empresa();
  proyecto: Solicitudproyecto = new Solicitudproyecto();
  rows: FormArray;
  itemForm?: FormGroup;
  nombreempresa?:String;
  codigo?: String;

  listaCarreras?: String;
  siglas?: String;
  nombresolicitante?:String;
 cargosolicitante?:String;


  fechaactual?:Date;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,private fechaempService:FechaempService,
              private carrerasService: CarreraempService, private proyectoS: ProyectoempService, private responsable: ResponsablepppempService,
              private empresaS: EmpresaService,
              private _adapter: DateAdapter<any>,) {
    this._adapter.setLocale('es-ec');
    //ArrayActividades
    this.secondFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this._formBuilder.array([]);

  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    },1000)
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let nombreempresa = params['nombreempresa']
      let nombresolicitante = params['nombresolicitante']
      let cargosolicitante = params['cargosolicitante']
      this.nombreempresa=nombreempresa;
      this.ide=id;
      this.nombresolicitante=nombresolicitante
      this.cargosolicitante=cargosolicitante
      console.log(this.ide)
    })
    this.fechaempService.getSysdate().subscribe(value => {
      this.fechaactual=value.fecha;
    })

    this.firstFormGroup = this._formBuilder.group({

      plazo:['', Validators.required],
      carrera: ['',Validators.required],
      numeroEst: ['',Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });


    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);

  }



  //ArrayActividadesEmpresa
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({
      descripcion: ['', Validators.required],
    });
  }

  refresh(){
    window.location.reload();
  }
  meses?:String;

  obtnerMeses(){
    let ini = moment(this.firstFormGroup?.getRawValue().start);
    let fin = moment(this.firstFormGroup?.getRawValue().end);
    let diff = fin.diff(ini, 'months');
    this.proyecto.plazoEjecucion=diff+' Meses'
  }


  res?:number;
  variableresponsable?: String;

  obtenerDatos(): Solicitudproyecto {
    this.proyecto.estado = true;
    this.proyecto.coordinadorCedula='0103156675';
    this.proyecto.actividadesEmpresaProyecto=this.rows.getRawValue();
    // @ts-ignore
    this.proyecto.empresa = this.ide;
    // @ts-ignore
    this.proyecto.nombresolicitante=this.nombresolicitante;
    // @ts-ignore
    this.proyecto.cargosolicitante=this.cargosolicitante;
    this.proyecto.fechaat=this.fechaactual;
    // @ts-ignore
    this.proyecto.nombreempresa=this.nombreempresa;
    // @ts-ignore
    this.proyecto.nombre=this.nombreempresa;
    console.log(this.proyecto.nombreempresa+"nombre de la emrpesa ")
    return this.proyecto;
  }




  obtenerResponsable(event: MatSelectChange) {
    console.log("entraResponsable")
    this.codigo = this.proyecto.codigocarrera;

    this.responsable.getResposablepppbyCarrera(this.codigo+"").subscribe(data=>{
      this.proyecto.responsablePPP=data.id;
      console.log("id:"+this.proyecto.responsablePPP)
      this.proyecto.nombreresponsable=data.nombres_completo;
      console.log("nombre:"+this.proyecto.nombreresponsable)

    });

    this.carrerasService.getCarrerabyCodigo(this.codigo + "").subscribe(value => {
      this.proyecto.carrera=value.nombre;
      console.log("nombre carrera:"+this.proyecto.carrera)
    });


  }


  almacenarSolicitud() {
    var proyecto=this.obtenerDatos()
    this.proyectoS.saveSolicitudes(proyecto).subscribe(value => {
      console.log("entrarrrrrrrrrr" + this.proyectoS.saveSolicitudes(proyecto));
      Swal.fire({
        title: 'Solicitud enviada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }, error => {
      Swal.fire({
        title: 'No se pudo enviar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      // window.location.reload();
    });
  }


  subirDocumento(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.proyecto.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.proyecto.documento=docx+"";
        }
      })
    }
  }

  generarDocumento() {
    var proyecto:Solicitudproyecto=this.obtenerDatos();
    console.log(proyecto)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo1.docx", function(
      // @ts-ignore
      error,
      // @ts-ignore
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      doc.setData({
        fecha:pipe.transform(proyecto.fechaat,'dd/MM/yyyy'),
        responsablePPP:proyecto.nombreresponsable,
        nombreCarrera:proyecto.carrera,
        nombreEmpresa:proyecto.nombreempresa,
        nEstudiantes:proyecto.participantes,
        tb5:proyecto.actividadesEmpresaProyecto,
        fechaInicio:pipe.transform(proyecto.fechaInicio,'dd/MM/yyyy'),
        solicitanteNombre:proyecto.nombresolicitante,
        solicitanteCargo:proyecto.cargosolicitante,

        /////todos los datos que se quieran enviar
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        // @ts-ignore
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                // @ts-ignore
                error[key] = value[key];
                return error;
              },
              {});
          }
          return value;
        }
        //console.log(JSON.stringify({ error: error }, replaceErrors));
        // @ts-ignore
        if (error.properties && error.properties.errors instanceof Array) {
          // @ts-ignore
          const errorMessages = error.properties.errors
            // @ts-ignore
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          //console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "Anexo1.docx");
    });
  }


}
