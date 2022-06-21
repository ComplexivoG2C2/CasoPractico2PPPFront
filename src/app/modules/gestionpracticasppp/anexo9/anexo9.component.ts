import { Component, OnInit } from '@angular/core';


import {FechaService} from "../../../services/fecha.service";
import {DatePipe} from "@angular/common";
import {MatSelectChange} from "@angular/material/select";
import {Anexo3} from "../../../models/anexo3";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {ActividadesAnexo9Request, Anexo9} from "../../../models/anexo9";
import {Empresa} from "../../../models/empresa";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Anexo3Service} from "../../../services/anexo3.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ActivatedRoute} from "@angular/router";
import {Anexo9Service} from "../../../services/anexo9.service";
import Swal from "sweetalert2";
import Docxtemplater from "docxtemplater";

// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";

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
  selector: 'app-anexo9',
  templateUrl: './anexo9.component.html',
  styleUrls: ['./anexo9.component.css']
})
export class Anexo9Component implements OnInit {

  issloading=true;
  Fechaenvio?: Date;
  isLinear = true;
  panelOpenState = true;
  isexist?: boolean;
  canBotton: boolean = false
  public sum=0;
  actualzar=false
  public cedula?:String;
  public nombre?:String;
  anexo3:Anexo3[]=[];
  solicitudproyectos:Solicitudproyecto[]=[];
  anexo9requeste:Anexo9=new Anexo9();
  solicitudproyecto:Solicitudproyecto=new Solicitudproyecto();
  empresa:Empresa=new Empresa();
  //secuenciasdepantallas
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;
  ////ARRAY
  rows: FormArray;
  itemForm?: FormGroup;
//ANEXO8
  constructor(private fechaService: FechaService,private anexo9Service:Anexo9Service,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private anexo3Service:Anexo3Service, private proyectoService:ProyectoService) {
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
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre=nombre;
      this.cedula=cedula;
      this.anexo3Service.getanexo3(cedula).subscribe(datos=>{
        this.proyectoService.getSolicitudes().forEach(value => {
          this.solicitudproyectos=value.filter(value1 => value1.id==datos.filter(d=>d.estado=="AN")[datos.length-1].idProyectoPPP&&value1.estado==true)
        })
        this.issloading=false;
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.Fechaenvio = value.fecha;
      })
    })
    //ArrayActividadesEst


    this.firstFormGroup = this._formBuilder.group({
      proyecto: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
    //ArrayActividades
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);
  }


  //ArrayActividades
  onAddRow(actividades:ActividadesAnexo9Request) {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup(actividades));
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.numHoras;

      // console.log(this.sum)
    })
    //console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.numHoras;
      //  console.log(this.sum)
    })
  }
  ///
  createItemFormGroup(actividades:ActividadesAnexo9Request): FormGroup {
    return this._formBuilder.group({
      id:actividades?.id,
      fecha:actividades?.fecha,
      descripcionActividad:actividades?.descripcionActividad,
      horallegada:actividades?.horallegada,
      horasalida:actividades?.horasalida,
      numHoras:actividades?.numHoras,
    });
  }
  sumar(){
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.numHoras;
      // console.log(this.sum)
      //console.log(this.proyecto)
    })
  }

  eliminarActividad(actividades:ActividadesAnexo9Request){
    console.log(this.anexo9requeste.id,actividades.id)
    this.anexo9Service.deteledActivadades(this.anexo9requeste.id,actividades.id).subscribe(data=>{
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
      this.actulizar();
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


  selectOpcion(event: MatSelectChange){
    this.proyectoService.getSolicitudesbyid(event.value).subscribe(data=>{
      this.solicitudproyecto=data
      console.log( this.solicitudproyecto)
      this.anexo9Service.getEntidadById(data.empresa).subscribe(da=>{
        this.empresa=da;
      })
    })
    this.anexo9Service.getAnexo9byCedula(this.cedula+'').subscribe(datos=>{
      if(datos.length!=0){
        this.anexo9requeste=datos[0]
        if(datos[0].actividades?.length!=0){
          this.actualzar=true;
          datos[0].actividades?.forEach(element => {
            this.onAddRow(element)
          });
        }else {
          this.onAddRow(new ActividadesAnexo9Request())
        }
      }
    })

  }



  anexo9:Anexo9= new Anexo9;
  ontnerDatos():Anexo9{
    this.anexo9.cedulaEstudiante=this.cedula;
    this.anexo9.idProyectoPPP=this.solicitudproyecto.id;
    this.anexo9.nombreTutoremp=this.solicitudproyecto.nombretutoremp;
    this.anexo9.nombreTutorAcademico=(this.solicitudproyecto.tutorAcademicoResponse!=undefined)?this.solicitudproyecto.tutorAcademicoResponse[0].nombres:"";
   console.log(this.anexo9.nombreTutorAcademico)
    this.anexo9.nombreEmpresa=this.solicitudproyecto.nombre;
    this.anexo9.nombreEstudiante=this.nombre;
    this.anexo9.nombreProyecto=this.solicitudproyecto.nombre;
    this.anexo9.totalHoras=this.sum;
    this.anexo9.actividades=this.rows.getRawValue();
    this.anexo9.nombreRepresentanteemp=this.empresa.nombreCoordinador;

    return this.anexo9;
  }
  guardar(){
    this.anexo9=this.ontnerDatos();
    this.anexo9Service.saveAnexo9(this.ontnerDatos()).subscribe(datos=>{
      // console.log(">."+this.anexo8Service.saveAnexo8(this.ontnerDatos()))
      Swal.fire({
        title: 'Actividad Registrada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      // window.location.reload();
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
    })

  }

  subirDocumento9(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo9.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo9.documento=docx+"";
        }
      })
    }
  }

  actulizar(){
    // console.log(this.ontnerDatos())
    this.anexo9.id=this.anexo9requeste.id
    this.anexo9Service.updateActivadades(this.ontnerDatos()).subscribe(datos=>{
      // console.log(this.anexo8Service.updateActivadades(this.ontnerDatos()))
      Swal.fire({
        title: 'Actividad Registrada',
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
    })
  }
  ggenerarDocumento9() {
    var anexo9:Anexo9=this.ontnerDatos();
    // console.log(anexo8)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo9.docx", function(
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
        nombre_proyecto:anexo9.nombreProyecto,
        empresa:anexo9.nombreEmpresa,
        nombre_estudiante:anexo9.nombreEstudiante,
        identificiacion_est:anexo9.cedulaEstudiante,
        nombre_admin_entidad:anexo9.nombreRepresentanteemp,
        tutoracademico:anexo9.nombreTutorAcademico,
        tutoremp:anexo9.nombreTutoremp,
        tb:anexo9.actividades,
        totalHoras:anexo9.totalHoras
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
          // console.log("errorMessages", errorMessages);
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
      saveAs(out, "Anexo9.docx");
    });
  }

}
