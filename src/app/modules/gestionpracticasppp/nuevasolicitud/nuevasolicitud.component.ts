import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ActividadesEmpresalistProyecto, Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Empresa} from "../../../models/empresa";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Carreras} from "../../../models/carreras";
import {MatSelectChange} from "@angular/material/select";
import {DateAdapter} from "@angular/material/core";

import Docxtemplater from "docxtemplater";

// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {DatePipe} from "@angular/common";

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
  public nombre?:String;
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

  listaCarreras?: String;
  siglas?: String;

  constructor(private router: Router, private fechaService: FechaService, private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder, private empresaService: EmpresaService,
              private carreras: CarrerasService, private proyectoS: ProyectoService, private responsable: ResponsablepppService,
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
      let nombre = params['nombres']
      this.nombre=nombre;
      this.empresas.idCoordinador = id;

      this.ide=id;
      console.log(this.ide)
    })
    this.firstFormGroup = this._formBuilder.group({
      descripcion: [''],
      responsable: [''],
      titulo: [''],
      fechaI: [''],
      numeroEst: [''],
      carrera: [''],
      fecha: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });


    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);
//     this.carreras.getCarreras().subscribe(value1 => {
//   //@ts-ignore
//       this.listaCarreras=value1.filter(value2 => value2.codigo == value[0].codigo)[0].nombre
// //@ts-ignore
//       this.siglas=value1.filter(value2=>value2.codigo == value[0].codigo)[0].codigo
//       console.log(value1+"Value")
//     });
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




  proyecto2: Solicitudproyecto = new Solicitudproyecto();
  res?:number;
  abc?: String;

  obtenerDatos(): Solicitudproyecto {
    this.proyecto.estado = false;
    this.proyecto.nombreresponsable = this.abc;
    this.proyecto.carrera = this.carreraNombre;
    this.proyecto.actividadesEmpresaProyecto=this.rows.getRawValue();
    this.proyecto.empresa = this.ide;
    console.log(this.proyecto.empresa+"vkjhgftgyhujikcosc ")
    this.proyecto.responsablePPP = this.res;
    console.log(this.proyecto.responsablePPP+"vkjhgfcdfvssscscsccssc ")
    return this.proyecto;
  }

  carrera?: String;
  carreraNombre?: String;
  carreraModel: Carreras = new Carreras();

  obtenerResponsable(event: MatSelectChange) {
    console.log("entraResponsable")
    this.carrera = this.proyecto.codigocarrera;
    this.responsable.getResposablepppbyCarreraempresa(this.carrera + "").subscribe(value => {
      // @ts-ignore
      this.res = value.id
      this.abc = value.nombres_completo;
    });

    this.carreras.getCarrerabyCodigoempresa(this.carrera + "").subscribe(value => {
      this.carreraModel = value
      this.carreraNombre = value.nombre;
    });


  }


  almacenarSolicitud() {
    console.log("Almacenar")
    this.obtenerDatos()
    this.proyectoS.saveSolicitudes(this.proyecto).subscribe(value => {
      console.log(this.obtenerDatos()+"activiadedess");
      console.log("entra" + this.proyectoS);
      Swal.fire({
        title: 'Exito',
        text: 'Solicitud enviada',
        icon: 'success',
        iconColor: '#0064ff',
        color: "#050000",
        confirmButtonColor: "#0085ff",
        background: "#ffffff",
      })
    }, error => {
      Swal.fire({
        title: 'Error',
        text: '...' + error.error.message,
        icon: 'error',
        iconColor: '#007cff',
        color: "#090000",
        confirmButtonColor: "#0081ff",
        background: "#ffffff",
      })
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
    var p:Solicitudproyecto=this.obtenerDatos();
    //console.log(anexo61)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("  https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo1.docx", function(
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
        fecha:pipe.transform(p.fechaat,'dd/MM/yyyy'),
        responsablePPP:p.responsablePPP,
        nombreCarrera:p.carrera,
        nombreEmpresa:p.empresa,
        nEstudiantes:p.particpantes,
        tb:p.actividadesEmpresaProyecto,
        fechaInicio:pipe.transform(p.fechaInicio,'dd/MM/yyyy'),
        solicitanteNombre:p.nombreresponsable,
        solicitanteCargo:p.lineaaccion,

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
