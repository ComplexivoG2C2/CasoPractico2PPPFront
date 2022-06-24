import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {Anexo14} from "../../../models/anexo14";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Anexo14empService} from "../../../services/anexo14emp.service";
import {FechatutorempService} from "../../../services/fechatutoremp.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo12empService} from "../../../services/anexo12emp.service";
import {ProyectotutorempService} from "../../../services/proyectotutoremp.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo12} from "../../../models/anexo12";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";

// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {Anexo121} from "../../../models/anexo121";
import {Anexo121tutorempService} from "../../../services/anexo121tutoremp.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo8} from "../../../models/anexo8";
import {Anexo7Service} from "../../../services/anexo7.service";
import {Anexo7tutorempService} from "../../../services/anexo7tutoremp.service";
import {Anexo7} from "../../../models/anexo7";
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
  selector: 'app-anexo121',
  templateUrl: './anexo121.component.html',
  styleUrls: ['./anexo121.component.css']
})
export class Anexo121Component implements OnInit {


  activar?:boolean=false;
  sum = 0;
  numerominimo=0;

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  isexist?: boolean;
  myControl = new FormControl();
  cedula?:String;
  idpro?:Number;
  fechai?:Date;
  fechaf?:Date;
  fechae?:Date;
  user: User=new User();

  anexo12: Anexo12=new Anexo12();

  proyectoselect: Solicitudproyecto = new Solicitudproyecto();

  firstFormGroup?: FormGroup;
  secondFormGroup?:FormGroup;
  thirdFormGroup?:FormGroup;
  fourFormGroup?:FormGroup;
  addForm: FormGroup;
  anexo7:Anexo7[]=[];
anexos7:Anexo7=new Anexo7();
  numero?:Number;
  rows: FormArray;
  itemForm?: FormGroup;
  tutoracaItem1?:String;
  nombre?:String;
  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private fechatutorempService: FechatutorempService,
              private _adapter: DateAdapter<any>,
              private anexo12tutorempService:Anexo12empService,
              private solicitudemptutorService:ProyectotutorempService,
              private anexo7Service:Anexo7tutorempService,
              private anexo121Service:Anexo121tutorempService
  ) {
    this._adapter.setLocale('es-ec');
    //ArrayActividades

    this.addForm = this._formBuilder.group({});
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      let idpro = params['idpro']
      let nombre = params['nombre']
      this.idpro= idpro;
      this.nombre=nombre;

      console.log("este es el id de proyecto"+this.idpro)

      console.log("este es el id de nn"+this.nombre)

      this.anexo12tutorempService.getAnexo12biidppp(idpro).subscribe(data => {
        this.anexo12= data
        console.log(this.anexo12+"ccccccccccccc")

        this.anexo7Service.getAnexo7().subscribe(value => {
          console.log(Number(data.id) + "CODIGOOOOOO PROYECTO")
          this.anexo7=value.filter(value8=>value8.nombreEstudiante==data.nombresEstudiante)

            this.anexos7=this.anexo7[0];

            console.log("fffffffffffffff"+value)



        })
        this.issloading = false;


      })
      this.fechatutorempService.getSysdate().subscribe(value => {
        this.fechae = value.fecha;
      })
    })

    this.firstFormGroup = this._formBuilder.group({

    });

    this.thirdFormGroup = this._formBuilder.group({
    });

    this.thirdFormGroup.get("items_value")?.setValue("yes");
    this.thirdFormGroup.addControl('rows', this.rows);
    this.addForm.get("items_value")?.setValue("");
    this.addForm.addControl('rows', this.rows);
  }

  //ArrayActividades
  onAddRow(descripcion: String) {
    this.rows.push(this.createItemFormGroup(descripcion));
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(descripcion: String): FormGroup {
    return this._formBuilder.group({
      descripcion: [descripcion, Validators.required],
    });
  }

  anexo121: Anexo121= new Anexo121();
  obtenerdatos(){
    this.anexo121.cedulaEstudiante=this.anexo12.cedulaEstudiante;
    this.anexo121.idProyecto=this.anexo12.idProyecto;
    this.anexo121.nombretutoremp=this.anexo12.nombretutoremp;
    this.anexo121.nombresEstudiante=this.anexo12.nombresEstudiante;
    this.anexo121.tutorempPuntaje=this.anexo12.tutorempPuntaje;
    this.anexo121.promedio=this.anexo12.promedio;
    this.anexo121.fechaInicio=this.anexo12.fechaInicio;
    this.anexo121.fechaFinaliza=this.anexo12.fechaFinaliza;
    this.anexo121.empresa=this.anexo12.empresa;
    this.anexo121.cedulatutoremp=this.anexo12.cedulatutoremp;
    this.anexo121.carrera=this.anexo12.carrera;
    this.anexo121.siglascarrera=this.anexo12.siglascarrera;
    this.anexo121.fechaEvaluacion=this.anexo12.fechaEvaluacion;
    this.anexo121.totalHoras=this.anexo12.totalHoras;

    this.anexo121.actividades=this.anexos7.actividadesAnexo7s;
    console.log(this.anexo121.totalHoras)
    return this.anexo121;
  }


  guardar(){
    this.anexo121=this.obtenerdatos();
    this.anexo121Service.saveAnexo121(this.anexo121).subscribe(datos=>{
      Swal.fire({
        title: 'Evaluacion Completada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload()
      this.issloading=false;
    },err=>{
      Swal.fire({
        title: 'Certificado ya generado anterirmente',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
      this.issloading=false;
    })
  }


  subirDocumento121(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo121.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo121.documento=docx+"";
        }
      })
    }
  }

  generarDocumento121() {
    var anexo121:Anexo121=this.obtenerdatos();
    console.log(anexo121)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo121.docx", function(
      // @ts-ignore
      error,
      // @ts-ignore
      // @ts-ignore
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });


      doc.setData({
        fecha:pipe.transform(anexo121.fechaEvaluacion,'dd/MM/yyyy'),
        fechaInicio:pipe.transform(anexo121.fechaInicio,'dd/MM/yyyy'),
        fechaFin:pipe.transform(anexo121.fechaFinaliza,'dd/MM/yyyy'),
        tb5:anexo121.actividades,
        nombreTutoremp:anexo121.nombretutoremp,
        nombreEstudiante:anexo121.nombresEstudiante,
        cedulaEstudiante:anexo121.cedulaEstudiante,
        empresa:anexo121.empresa,
        carrera:anexo121.carrera,
        nhoras:anexo121.totalHoras,
        nota:anexo121.tutorempPuntaje,

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
      saveAs(out, "Anexo12_1.docx");
    });
  }
  refresh() {
    window.location.reload();
  }
}

