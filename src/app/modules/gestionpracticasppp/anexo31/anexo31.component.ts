import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {MatSelectChange} from "@angular/material/select";
import Swal from "sweetalert2";
import {Anexo4} from "../../../models/anexo4";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {Materias} from "../../../models/materias";
import {Anexo3_1} from "../../../models/anexo3_1";
import {Anexo31Service} from "../../../services/anexo3-1.service";
import {FechaempService} from "../../../services/fechaemp.service";
import {ProyectoempService} from "../../../services/proyectoemp.service";
import {ResponsablepppempService} from "../../../services/responsablepppemp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {Anexo2} from "../../../models/anexo2";
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
  selector: 'app-anexo31',
  templateUrl: './anexo31.component.html',
  styleUrls: ['./anexo31.component.css']
})
export class Anexo31Component implements OnInit {
  isLinear = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  anexo3_1:Anexo3_1=new Anexo3_1();
  anexo3_11:Anexo3_1[]=[];
  numeroConvocatoria?:String;
  data:Date = new Date();
  iddesolicitud?:Number;

  fechaactual?:Date;

  proyecto: Solicitudproyecto = new Solicitudproyecto();


  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

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
    private proyectoS: ProyectoempService,
    private responsable: ResponsablepppempService,
    private fechaempService:FechaempService,
    private serviceAnexo3_1:Anexo31Service,
    private empresaS: EmpresaService,
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
    this.firstFormGroup = this._formBuilder.group({
       fechaS:['',Validators.required],
      titulo:['',Validators.required],
       nombreRepresentanteE:['', Validators.required],
       cargo: ['',Validators.required],
       empresa: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      fechaE:['',Validators.required],
      responsablePPP:['',Validators.required],
      carrera:['',Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });

    this.fechaempService.getSysdate().subscribe(value => {
      this.fechaactual=value.fecha;
    })
  }

  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({});
  }

  obtenerDatosanexo3_1(proyecto:Solicitudproyecto):Anexo3_1 {
    this.anexo3_1.nombreRepresentanteEmp =proyecto.nombresolicitante
    this.anexo3_1.cargoEmpresa=proyecto.cargosolicitante;
    this.anexo3_1.nombreEmpresa = proyecto.nombreempresa;
    this.anexo3_1.nombreResponsable = proyecto.nombreresponsable;
    this.anexo3_1.carrera = proyecto.carrera;
    this.anexo3_1.num_proceso=1;
    this.anexo3_1.idProyectoPPP = proyecto.id;
    this.fechaService.getSysdate().subscribe(value => {
      this.anexo3_1.fechaRespuesta = value.fecha;
      this.anexo3_1.fechaSolicitudEmp = value.fecha;
    })
    return this.anexo3_1
    console.log("datos"+this.anexo3_1)
  }


  subirDocumento(proyecto:Solicitudproyecto,file:FileList){
    this.obtenerDatosanexo3_1(proyecto);
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo3_1.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo3_1.documento=docx+"";
        }
      })
    }
  }

  generarDocumento(proyecto:Solicitudproyecto) {
    console.log(this.obtenerDatosanexo3_1(proyecto))
    var pipe:DatePipe = new DatePipe('en-US')
    var anexo:Anexo3_1=this.obtenerDatosanexo3_1(proyecto);
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/oscar/src/assets/docs/Anexo3_1.docx", function(
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
        // @ts-ignore
        fecha:pipe.transform(anexo.fechaRespuesta,'dd/MM/yyyy'),
        titulo:anexo.tituloRepresentanteEmp,
        nombreRepresentanteEmp: anexo.nombreRepresentanteEmp,
        cargoEmpresa: anexo.cargoEmpresa,
        nombreEmpresa: anexo.nombreEmpresa,
        fechaSolicitudEmp:pipe.transform(anexo.fechaSolicitudEmp,'dd/MM/yyyy'),
        nombreResposable: anexo.nombreResponsable,
        carrera: anexo.carrera,
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
      saveAs(out, "Anexo3_1.docx");
    });
  }

}
