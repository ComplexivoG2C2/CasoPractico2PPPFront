import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {MatSelectChange} from "@angular/material/select";
import Swal from "sweetalert2";
import {Anexo4} from "../../../models/anexo4";
import {Anexo4Service} from "../../../services/anexo4.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Anexo2} from "../../../models/anexo2";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";

@Component({
  selector: 'app-anexo4-seleccion-e',
  templateUrl: './anexo4-seleccion-e.component.html',
  styleUrls: ['./anexo4-seleccion-e.component.css']
})
export class Anexo4SeleccionEComponent implements OnInit {
  isLinear = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  anexo4:Anexo4=new Anexo4();
  numeroConvocatoria?:String;
  data:Date = new Date();
  iddesolicitud?:Number;

  omit_special_char(event: { charCode: any; }) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k >= 48 && k <= 57));
  }

  omit_max_char(event: { target: any; }) {
    var k;
    k = event.target.value.length;  //         k = event.keyCode;  (Both can be used)
    console.log(k)
    return (k <= 9);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private fechaService: FechaService,
    anexo4Service:Anexo4Service,
    private responsablepppService:ResponsablepppService,
    private _adapter: DateAdapter<any>
  ) {
    this._adapter.setLocale('es-ec');

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
    },1000)
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });

  }

  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({});
  }

  obtenerDatosanexo4(proyecto:Solicitudproyecto):Anexo4 {
    this.anexo4.nombreRepresentanteEmp =proyecto.nombresolicitante;
    this.anexo4.cargoEmpresa=proyecto.cargosolicitante;
    this.anexo4.nombreEmpresa = proyecto.nombreempresa;
    this.anexo4.nombreResponsable = proyecto.nombreresponsable;
    this.anexo4.carrera = proyecto.carrera;
    this.anexo4.num_proceso=1;
    this.anexo4.idProyectoPPP = proyecto.id;
    this.fechaService.getSysdate().subscribe(value => {
      this.anexo4.fechaRespuesta = value.fecha;
      this.anexo4.fechaSolicitudEmp = value.fecha;
    })
    return this.anexo4
    console.log("datos"+this.anexo4)
  }

  // generarDocumento(proyecto:Solicitudproyecto) {
  //   console.log(this.obtenerDatosanexo4(proyecto))
  //   var pipe:DatePipe = new DatePipe('en-US')
  //   var anexo:Anexo2=this.obtenerDatosanexo4(proyecto);
  //   loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo2.docx", function(
  //     // @ts-ignore
  //     error,
  //     // @ts-ignore
  //     content
  //   ) {
  //     if (error) {
  //       throw error;
  //     }
  //     const zip = new PizZip(content);
  //     const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  //
  //
  //     doc.setData({
  //       // @ts-ignore
  //       fecha:anexo.fecha,
  //       siglas: anexo.siglasCarrera,
  //       anio: anexo.anio,
  //       nro: anexo.numeroConvocatoria,
  //       ciclo: anexo.ciclo,
  //       carrera: anexo.carrera,
  //       empresa: anexo.empresa,
  //       tb1: proyecto.actividadeslistProyectos,
  //       tb2: proyecto.requisitoslistProyectos,
  //       nombre_responsableppp: anexo.nombreResponsable,
  //       fecha_max:pipe.transform(anexo.fechaMaxRecepcion,'dd/MM/yyyy'),
  //     });
  //     try {
  //       // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
  //       doc.render();
  //     } catch (error) {
  //       // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
  //       // @ts-ignore
  //       function replaceErrors(key, value) {
  //         if (value instanceof Error) {
  //           return Object.getOwnPropertyNames(value).reduce(function(
  //               error,
  //               key
  //             ) {
  //               // @ts-ignore
  //               error[key] = value[key];
  //               return error;
  //             },
  //             {});
  //         }
  //         return value;
  //       }
  //       //console.log(JSON.stringify({ error: error }, replaceErrors));
  //       // @ts-ignore
  //       if (error.properties && error.properties.errors instanceof Array) {
  //         // @ts-ignore
  //         const errorMessages = error.properties.errors
  //           // @ts-ignore
  //           .map(function(error) {
  //             return error.properties.explanation;
  //           })
  //           .join("\n");
  //         //console.log("errorMessages", errorMessages);
  //         // errorMessages is a humanly readable message looking like this :
  //         // 'The tag beginning with "foobar" is unopened'
  //       }
  //       throw error;
  //     }
  //     const out = doc.getZip().generate({
  //       type: "blob",
  //       mimeType:
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //     });
  //     // Output the document using Data-URI
  //     saveAs(out, "Anexo4 "+anexo.nombreResponsable+" Covocatoria Nª"+anexo.numeroConvocatoria+"de"+anexo.carrera+".docx");
  //   });
  // }

}
