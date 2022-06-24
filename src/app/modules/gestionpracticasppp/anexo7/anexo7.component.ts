import { Component, OnInit } from '@angular/core';
import Docxtemplater from "docxtemplater";

// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {MateriasService} from "../../../services/materias.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo6} from "../../../models/anexo6";
import {Anexo7} from "../../../models/anexo7";
import {Anexo1} from "../../../models/anexo1";
import {Materias} from "../../../models/materias";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {EmpresaService} from "../../../services/empresa.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo7Service} from "../../../services/anexo7.service";
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
  selector: 'app-anexo7',
  templateUrl: './anexo7.component.html',
  styleUrls: ['./anexo7.component.css']
})
export class Anexo7Component implements OnInit {

  pipe:DatePipe = new DatePipe('en-US')

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  tabla2FormGroup?:FormGroup;
  tabla1FormGroup?:FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading=true;
  isexist?:boolean;
  activate?:boolean=true;
  activar?:boolean=false;

  myControlproyecto = new FormControl();
  filteredOptionsProyecto?: Observable<Solicitudproyecto[]>;
  proyectos:Solicitudproyecto[]=[];
  proyectoselect:Solicitudproyecto=new Solicitudproyecto();
  materias:Materias[]=[];

  anexo7:Anexo7 = new Anexo7();
  // anexo61:Anexo61 = new Anexo61();
  // anexo62:Anexo62 = new Anexo62();

  sum = 0;
  numerominimo=0;
  //ArrayAntividades
  rows: FormArray;
  itemForm?: FormGroup;


  rows2: FormArray;
  itemForm2?: FormGroup;

  anexo1:Anexo1[]=[];
  anexo06:Anexo6=new Anexo6();


  cedula?:String;



//////////////semanas


  ////////////////


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
              private anexo06Service:Anexo6Service,
              private materiasService:MateriasService,
              private cordinadorvinculacionService:CordinadorvinculacionService,
              private anexo7Service:Anexo7Service) {
    this._adapter.setLocale('es-ec');
    ////segunda tabla
    this.thirtdFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this._formBuilder.array([]);
    ////primer tabla
    this.tabla2FormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows2 = this._formBuilder.array([]);

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
            map(values=>this.filter(values)),
          );
          this.issloading=false;
          this.isexist=true;
        })
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.anexo7.fechaReunion=value.fecha;
      })

    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      docente:['',Validators.required],
      estudiante: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({
    });
    this.tabla2FormGroup = this._formBuilder.group({
      entrada:['',Validators.required],
      salida:['',Validators.required],
      lugar:['',Validators.required],
    });
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });

    //Arraycronograma
    this.thirtdFormGroup.get("items_value")?.setValue("yes");
    this.thirtdFormGroup.addControl('rows', this.rows);
    //ArrayActividades
    this.tabla2FormGroup.get("items_value")?.setValue("yes");
    this.tabla2FormGroup.addControl('rows2', this.rows2);
    //ArrayActividades
  }


  //ArrayActividades
  onAddRow6(descripcion: String) {
    this.rows.push(this.createItemFormGroup6(descripcion));
  }

  onRemoveRow6(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup6(descripcion: String): FormGroup {
    return this._formBuilder.group({
      descripcion: [descripcion, Validators.required],
    });
  }


  onAddRow2(actividadRealizar: String) {
    this.rows2.push(this.createItemFormGroup2(actividadRealizar));
  }

  onRemoveRow2(rowIndex: number) {
    this.rows2.removeAt(rowIndex);
  }

  createItemFormGroup2(actividadRealizar: String): FormGroup {
    return this._formBuilder.group({
      area:['', Validators.required],
      actividadRealizar: [actividadRealizar, Validators.required],
      asignaturaRelacionada:['', Validators.required],
    });
  }


  //ArrayActividadescronogramr
  onAddRow(actividadRealizar:String) {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup(actividadRealizar));
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.nrohoras;
      console.log(this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  onRemoveRow(rowIndex:number){
    this.sum = 0;
    this.rows.removeAt(rowIndex);
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.nrohoras;
      console.log("quitar fila"+this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  sumar(){
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.nrohoras;
      //console.log(this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  createItemFormGroup(actividadRealizar:String): FormGroup {
    return this._formBuilder.group({
      actividadRealizar:[actividadRealizar, Validators.required],
      semanas:['',Validators.required],
      nrohoras:['', Validators.required],
    });
  }

  filter(value: any): Solicitudproyecto[] {
    const filterValue = value.toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }
fechaperiodo?:String;
  selectionProyecto(proyectoselect: MatSelectionListChange){
    this.rows.getRawValue().forEach((value, index) => {
      this.onRemoveRow(index);
    })
    this.rows2.getRawValue().forEach((value, index) => {
      this.onRemoveRow2(index);
    })
    this.activate=true;
    this.anexo06=new Anexo6();
    this.proyectoselect=proyectoselect.option.value
    this.proyectoselect.actividadeslistProyectos?.forEach(value1 => {
      this.onAddRow(value1.descripcion+"");
      this.onAddRow2(value1.descripcion + "");
      console.log("siguiente")
    })

    this.anexo1Service.getAnexo1byIdProyecto(this.proyectoselect.id).subscribe(value => {
      this.anexo1=value;
      console.log(this.anexo1)
    })
    this.anexo2Service.getAnexoByidProyecto(this.proyectoselect.id).subscribe(value => {
      this.anexo7.ciclo=value.ciclo
      this.anexo7.carrera=value.carrera
    })
    this.materiasService.getMateriasbyCodCarrera(this.proyectoselect.codigocarrera).subscribe(value => {
      this.materias=value;
    })
    this.responsablepppService.getResposablepppbyCarrera(this.proyectoselect.codigocarrera+"").subscribe(value => {

      this.fechaperiodo=this.pipe.transform(value.fecha_inicio_periodo,'MMMM d, y')+" "+this.pipe.transform(value.fecha_fin_periodo,'MMMM d, y');
    })
    this.empresaService.getsaveEmpresabyId(Number(this.proyectoselect.empresa)).subscribe(value => {
      this.anexo7.nombreEmpresa=value.nombre;
    })
  }


  selectionDocente(docenteselect: String){
    this.anexo06Service.getAnexo6byCedula(docenteselect).subscribe(value => {
      if(value.length!=0){
        this.anexo06=value[value.length-1];
        this.anexo7.cedulaTutoracademico=value[value.length-1].cedulaDocenteApoyo;
        this.anexo7.nombreTutoracademico=value[value.length-1].nombreDocenteReceptor;

        this.activate=false;
      }else {
        this.activate=true;
        this.anexo06=new Anexo6();
        Swal.fire({
          title: 'El tutor Academico aun no tiene alumnos a su cargo',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    })
  }

  selectionAlumno(alimnoselect: String){
    this.anexo8Service.getAnexo8byCedula(alimnoselect).subscribe(value => {
      this.numerominimo=Number(value[value.length-1].numeroHoras);
      this.anexo7.cedulaEstudiante=value[value.length-1].cedulaEstudiante;
      this.anexo7.nombreEstudiante=value[value.length-1].nombreEstudiante;
      if(this.numerominimo-1>=this.sum){
        this.activar=true;
      }else{
        this.activar=false;
      }
      console.log(value)
    })
  }
  proyectoselect2:Solicitudproyecto[]=[];
  obtnerdatos():Anexo7{
    this.anexo7.idProyectoPPP=this.proyectoselect.id;
    this.anexo7.nombreEmpresa=this.proyectoselect.nombre;
    this.anexo7.nombreResponsable=this.proyectoselect.nombreresponsable;
    // @ts-ignore
    this.anexo7.horasTotales=this.sum+'';
    this.anexo7.Fechainicio=this.fechaperiodo;
    this.anexo7.num_proceso=1;
    this.anexo7.siglascarrera=this.proyectoselect.codigocarrera;
    console.log("estas son las siglas de la carrera"+this.anexo7.siglascarrera)
    // @ts-ignore
    this.anexo7.horasCumplidas=this.numerominimo;
    this.anexo7.cronogramaActividadesAnexo7s=this.rows.getRawValue();
    this.anexo7.actividadesCumplirAnexo7s=this.rows2.getRawValue();
    this.anexo7.nombreTutorEmp=this.proyectoselect.nombretutoremp;
    this.anexo7.tituloTutorEmp=this.proyectoselect.tituloTutoremp;

    this.anexo7.actividadesAnexo7s=this.proyectoselect.actividadeslistProyectos;

    return this.anexo7;
  }


  guardaranexo7(){
    var anexo7=this.obtnerdatos();
    this.anexo7Service.saveAnexo7(anexo7).subscribe(value => {
      Swal.fire({
        title: 'Acta Generada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate(['/panelusuario/gestionpracticasppp/anexo7listar',this.cedula])
    },error => {
      if(error.error.message=="La fecha de inicio no puede ser mayor a la fecha fin"){
        Swal.fire({
          title: '....',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }else {
        Swal.fire({
          title: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }

    })
  }

  subirDocumento(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo7.documento="";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        }else{
          this.anexo7.documento=docx+"";
        }
      })
    }
  }

  generarDocumento() {
    var anexo7: Anexo7 = this.obtnerdatos();
    //console.log(anexo6)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo7.docx", function (
      // @ts-ignore
      error,
      // @ts-ignore
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {paragraphLoop: true, linebreaks: true});


      doc.setData({
        fecha: pipe.transform(anexo7.fechaReunion, 'dd/MM/yyyy'),
        empresa: anexo7.nombreEmpresa,
        nombreEstudiante: anexo7.nombreEstudiante,
        fechainicio: anexo7.Fechainicio,
        ciclo: anexo7.ciclo,
        carrera:anexo7.carrera,
        horaInicio:anexo7.horasInicio,
        lugarReunion:anexo7.lugarReunion,
        horafin:anexo7.horasFin,
        horas:anexo7.horasTotales,
        act: anexo7.cronogramaActividadesAnexo7s,
        tb1:anexo7.actividadesCumplirAnexo7s,
        actividades:anexo7.actividadesAnexo7s,
        horasTotales: anexo7.horasTotales,
        nombreResponsable: anexo7.nombreResponsable
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        // @ts-ignore
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
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
            .map(function (error) {
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
      saveAs(out, "Anexo7 " + anexo7.nombreEstudiante + ".docx");
    });
  }

}
