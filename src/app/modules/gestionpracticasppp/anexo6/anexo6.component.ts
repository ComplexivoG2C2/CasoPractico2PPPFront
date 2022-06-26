import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Anexo1} from "../../../models/anexo1";
import {Anexo8} from "../../../models/anexo8";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {MatSelectionListChange} from "@angular/material/list";
import {AlumnosAnexo6, Anexo6} from "../../../models/anexo6";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function loadFile(url:any, callback:any) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-anexo6',
  templateUrl: './anexo6.component.html',
  styleUrls: ['./anexo6.component.css']
})
export class Anexo6Component implements OnInit {


  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading=true;
  isexist?:boolean

  myControlproyecto = new FormControl();
  filteredOptionsProyecto?: Observable<Solicitudproyecto[]>;
  proyectos:Solicitudproyecto[]=[];
  proyectoselect:Solicitudproyecto=new Solicitudproyecto();

  myControlanexo1 = new FormControl();
  filteredOptionsanexo1?: Observable<Anexo1[]>;
  docentesAnexo1:Anexo1[]=[];
  docenteselect:Anexo1 = new Anexo1();

  myControlAnexe8 = new FormControl();
  filteredOptionsAnexe8?: Observable<Anexo8[]>;
  alumnosAnexe8:Anexo8[]=[];
  alumnoselect:Anexo8[]=[];



  cedula?:String;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo8Service:Anexo8Service,
              private anexo1Service:Anexo1Service,
              private anexo6Service:Anexo6Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          this.proyectos=value1.filter(value2 => value2.codigocarrera==value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera&&value2.estado==true);
          this.filteredOptionsProyecto = this.myControlproyecto.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterProyecto(values)),
          );
          this.issloading=false;
        })
      })
      this.isexist=true;
      console.log(cedula)
    })


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({
    });
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
  }
  filterProyecto(value: any): Solicitudproyecto[] {
    const filterValue = value.toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombreempresa?.toLocaleLowerCase().includes(filterValue)
    );
  }
  filterAnexo1(value: any): Anexo1[] {
    const filterValue = value.toLowerCase();
    return this.docentesAnexo1.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreDelegado?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDelegado?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaCoordinador?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRol?.toLocaleLowerCase().includes(filterValue)
    );
  }
  filterAnexo8(value: any): Anexo8[] {
    const filterValue = value.toLowerCase();
    return this.alumnosAnexe8.filter(option => option.siglasCarrera?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRepresentante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionProyecto(proyectoselect: MatSelectionListChange){
    this.issloading=true;
    this.docentesAnexo1.length=0;
    this.alumnoselect.length=0;
    this.filteredOptionsanexo1= this.myControlanexo1.valueChanges;
    this.alumnosAnexe8.length=0;
    this.filteredOptionsAnexe8= this.myControlAnexe8.valueChanges;
    this.proyectoselect=proyectoselect.option.value
    this.anexo1Service.getAnexo1byIdProyecto(this.proyectoselect.id).subscribe(value => {
      value.forEach((value1, index) => {
        this.anexo6Service.getAnexo6byCedula(value1.cedulaDelegado+"").subscribe(value2 => {
          console.log(">>>"+value1.cedulaDelegado+"")
          if(value2.length==0){
            if(this.docentesAnexo1.filter(value3 => value3.cedulaDelegado==value1.cedulaDelegado).length==0){
              this.docentesAnexo1.push(value1)
            }
          }
          this.filteredOptionsanexo1= this.myControlanexo1.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterAnexo1(values)),
          );
          this.issloading=false;
        })
      })
    })
  }

  selectionDocente(docenteselect: MatSelectionListChange){
    this.alumnosAnexe8.length=0;
    this.alumnoselect.length=0;
    this.filteredOptionsAnexe8= this.myControlAnexe8.valueChanges;
    this.docenteselect=docenteselect.option.value;
    this.anexo8Service.getAnexo8All().subscribe(value => {
      value.filter(value1 => value1.idProyectoPPP==this.docenteselect.idProyectoPPP&&value1.num_proceso==2).forEach((value1, index) => {
        this.anexo6Service.getDocentesApoyo(value1.cedulaEstudiante,value1.idProyectoPPP).subscribe(value2 => {
          if(value2.cedulaDAapoyo==null){
            if(this.alumnosAnexe8.filter(value3 => value3.cedulaEstudiante==value1.cedulaEstudiante).length==0){
              this.alumnosAnexe8.push(value1)
            }
          }
          this.filteredOptionsAnexe8= this.myControlAnexe8.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterAnexo8(values)),
          );
        })
      })
    })
    this.fechaService.getSysdate().subscribe(data=>{
      this.anexo6resposae.fechaEmision=data.fecha;
    })
    this.anexo3Service.getDocenteTitulo(this.docenteselect.siglasCarrera).subscribe(det=>{
      this.anexo6resposae.nonbreDocenteEmisor=det.nombres_completo
    })
  }

  addAlumnos(anexo:Anexo8){
    //console.log(anexo)
    if(this.alumnoselect.filter(value => value.cedulaEstudiante==anexo.cedulaEstudiante).length==0){
      this.alumnoselect.push(anexo);
    }
  }
  removeAlumnos(anexo:Anexo8){
    this.alumnoselect.forEach((element,index)=>{
      if(element.cedulaEstudiante==anexo.cedulaEstudiante) this.alumnoselect.splice(index,1);
    });
  }


  public anexo6resposae:Anexo6 = new Anexo6;
  public alumnosAnexo6:AlumnosAnexo6[]=[];
  obtnerDatos():Anexo6{
    this.alumnosAnexo6.length=0;
    this.alumnoselect.forEach((value, index) => {
      this.alumnosAnexo6.push({
        nombreEstudiante:value.nombreEstudiante+"",
        cedulaEstudiante:value.cedulaEstudiante+""
      })
    })
    this.anexo6resposae.num_proceso=1;
    this.anexo6resposae.tituloTercerN=this.docenteselect.docenteTitulo;
    this.anexo6resposae.siglasCarrera=this.docenteselect.siglasCarrera;
    this.anexo6resposae.idProyectoPPP=this.docenteselect.idProyectoPPP;
    this.anexo6resposae.nombreProyecto=this.docenteselect.nombreProyecto
    this.anexo6resposae.nombrerol=this.docenteselect.nombreRol;
    this.anexo6resposae.alumnos=this.alumnosAnexo6;
    this.anexo6resposae.nombreDocenteReceptor=this.docenteselect.nombreDelegado;
    this.anexo6resposae.cedulaDocenteApoyo=this.docenteselect.cedulaDelegado
    return this.anexo6resposae
  }

  generarAnexo(){
    if(this.alumnoselect.length==0){
      Swal.fire({
        title: 'Debe seleccionar a los estudiantes a cargo',
        showClass: {
          popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
          popup: 'animate_animated animate_fadeOutUp'
        }
      })
    }else {
      this.generarDocumento(this.obtnerDatos())
    }
  }
  guardarAnexo(){
    if(this.alumnoselect.length==0){
      Swal.fire({
        title: 'Debe seleccionar a los estudiantes a cargo',
        showClass: {
          popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
          popup: 'animate_animated animate_fadeOutUp'
        }
      })
    }else {
      this.anexo6Service.saveAnexo6(this.obtnerDatos()).subscribe(value => {
        Swal.fire({
          title: 'Designacion Guardada',
          showClass: {
            popup: 'animate_animated animate_fadeInDown'
          },
          hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
          }
        })
        this.router.navigate(['/panelusuario/gestionpracticasppp/anexo6listar',this.cedula]);
      },error => {
        Swal.fire({
          title: 'Error',
          showClass: {
            popup: 'animate_animated animate_fadeInDown'
          },
          hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
          }
        })
      })
    }
  }

  subirDocumento(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo6resposae.documento="";
          Swal.fire(
            'Fallo',
            'El documento es demaciado pesado',
            'warning'
          )
        }else{
          this.anexo6resposae.documento=docx+"";
        }
      })
    }
  }


  generarDocumento(anexo6:Anexo6) {
    console.log("datos para el documento"+anexo6)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo6.docx", function(
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
        fecha:pipe.transform(anexo6.fechaEmision,'dd/MM/yyyy'),
        empresa:anexo6.nombreProyecto,
        tutorAcademico:anexo6.nombreDocenteReceptor,
        estudiantes:anexo6.alumnos,
        nombreResposable:anexo6.nonbreDocenteEmisor,
        carrera:anexo6.siglasCarrera
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
      saveAs(out, "Anexo6 de "+anexo6.nombreDocenteReceptor+".docx");
    });
  }

}
