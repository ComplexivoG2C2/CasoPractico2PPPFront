import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Anexo1} from "../../../models/anexo1";
import {Anexo6} from "../../../models/anexo6";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Empresa} from "../../../models/empresa";
import {Anexo8} from "../../../models/anexo8";
import {Anexo11, EstudiantesVisitaRequest, ListVisitaRequest} from "../../../models/anexo11";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmpresaService} from "../../../services/empresa.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Anexo11Service} from "../../../services/anexo11.service";
import {Anexo8Service} from "../../../services/anexo8.service";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
import {Anexo81} from "../../../models/anexo81";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
import {saveAs} from "file-saver";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo7} from "../../../models/anexo7";
import {Anexo7Service} from "../../../services/anexo7.service";
import {map, Observable, startWith} from "rxjs";
import {Anexo2} from "../../../models/anexo2";
import {TutorempuserService} from "../../../services/tutorempuser.service";
import {TutorEmpresarial} from "../../../models/tutorEmpresarial";
// @ts-ignore
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
  selector: 'app-anexo11',
  templateUrl: './anexo11.component.html',
  styleUrls: ['./anexo11.component.css']
})
export class Anexo11Component implements OnInit {
  isLinear = true;
  firstFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;
  minDate: Date | undefined = new Date();

  filteredOptionsanexo7?: Observable<Anexo7[]>;
  myControlanexo7 = new FormControl();
  anexo7lista: Anexo7[] = [];

  anexo6:Anexo6= new Anexo6();
  empresa:Empresa = new Empresa();
  isexist?:boolean=true;
  issloading=true;

  tutorlist:TutorEmpresarial[]=[];
  tutor:TutorEmpresarial=new TutorEmpresarial();

  Informe:ListVisitaRequest=new ListVisitaRequest();
anexo7:Anexo7=new Anexo7();
  // @ts-ignore
  addForm: FormGroup;
  rows: FormArray;
nombre?:String;
  anexo7select: Anexo7 = new Anexo7();
cedula?:String;
  anexo2:Anexo2=new Anexo2();
  anexo2lista:Anexo2[]=[];

  constructor(private _formBuilder: FormBuilder,
              private fechaService:FechaService,private carrerasService:CarrerasService,
              private activatedRoute: ActivatedRoute,
              private empresaService:EmpresaService,
              private anexo6Service:Anexo6Service,
              private anexo1Service:Anexo1Service,
              private router:Router, private tutorempresarialService:TutorempuserService,
              private anexo2Service:Anexo2Service,
              private responsablepppService:ResponsablepppService,
              private anexo11Service:Anexo11Service,private anexo7Service:Anexo7Service,
              private anexo8Service:Anexo8Service) {
    //ArrayActividades
    this.addForm = this._formBuilder.group({
    });
    this.rows = this._formBuilder.array([]);
  }

  ngOnInit(): void {
    this.fechaService.getSysdate().subscribe(value => {
      this.minDate=value.fecha;
    })
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
this.cedula=cedula;
        ///////
        this.anexo7Service.getAnexo7().subscribe(value1 => {
          this.anexo7lista = value1.filter(value2 => value2.nombreTutoracademico == nombre);
          console.log("entro al metodo nombre"+nombre)
          this.filteredOptionsanexo7= this.myControlanexo7.valueChanges.pipe(
            startWith(''),
            map(values => this.filteran7(values)),

          );
          console.log("entro al metodo"+this.filteredOptionsanexo7)
          this.issloading = false;
          this.isexist = true;

        })

    })
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({

    });
    this.fourFormGroup = this._formBuilder.group({
      descripcion: ['', Validators.required],
    });
  }

  selectionan7(anexo7select: MatSelectionListChange) {
    this.anexo7select = anexo7select.option.value
    console.log("anexo7")
    this.anexo11.carrera=this.anexo7select.carrera;
    console.log("carrera"+this.anexo11.carrera)
    console.log("ff")
    this.anexo2Service.getAnexoByidProyecto(this.anexo7select.idProyectoPPP).subscribe(value1 => {
      this.anexo2=value1
      // this.anexo2= this.anexo2lista[0]
      console.log("ciiclo"+this.anexo2.ciclo)
      this.tutorempresarialService.getTutoresAll().subscribe(value7=>{
        // this.tutorlist=value7.filter(ff=>ff.idProyectoPPP==this.anexo7select.idProyectoPPP)
        this.tutor=value7[0];

      })
    })

  }

  //ArrayActividades
  onAddRow(listVisitaRequest:ListVisitaRequest) {
    this.rows.push(this.createItemFormGroup(listVisitaRequest));
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(listVisitaRequest:ListVisitaRequest): FormGroup {
    return this._formBuilder.group({
      id:listVisitaRequest.id,
      actividades:[listVisitaRequest.actividades, Validators.required],
      observaciones:[listVisitaRequest.observaciones, Validators.required],
      horaInicio:[listVisitaRequest.horaInicio, Validators.required],
      horaFin:[listVisitaRequest.horaFin, Validators.required],
      fecha:[listVisitaRequest.fecha, Validators.required],
    });
  }

  anexo11:Anexo11=new Anexo11();
  obtnerDatos():Anexo11{

    // this.anexo11.carrera=this.anexo7select.siglascarrera;
    // console.log("carrera"+this.anexo11.carrera)
    this.anexo11.cedulaDirectorDocenteApoyo=this.cedula;
    this.anexo11.nombreDirectorDocenteApoyo=this.nombre;
    this.anexo11.nombreest=this.anexo7select.nombreEstudiante;
    this.anexo11.ciclo=this.anexo2.ciclo;
    ///falta tutor
this.anexo11.cedulaest=this.anexo7select.cedulaEstudiante;
this.anexo11.nombretutoremp=this.anexo7select.nombreTutorEmp;

this.anexo11.cedulaetutoremp=this.tutor.cedula;


    this.anexo11.empresa=this.anexo7select.nombreEmpresa;
    this.anexo11.proyectoId=this.anexo7select.idProyectoPPP;
    this.anexo11.siglascarrera=this.anexo7select.siglascarrera;
    this.anexo11.representanteLegal=this.empresa.representante;
    this.anexo11.informes=this.rows.getRawValue()
    return this.anexo11;
  }


  filteran7(value: any): Anexo7[] {
    const filterValue = value.toLowerCase();
    return this.anexo7lista.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
      || option.nombreResponsable?.toLocaleLowerCase().includes(filterValue)
      || option.nombreTutoracademico?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaTutoracademico?.toLocaleLowerCase().includes(filterValue)
    );
  }

  subirDocumento(file: FileList) {
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo11.documento = "";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        } else {
          this.anexo11.documento = docx + "";
        }
      })
    }
  }

  generarDocumento() {
    var anexo11: Anexo11 = this.obtnerDatos();
    //console.log(anexo6)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo11.docx", function (
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
        empresa: anexo11.empresa,
        nombreTutoracademico: anexo11.nombreDirectorDocenteApoyo,
        nombreEstudiante: anexo11.nombreest,
        ciclo:anexo11.ciclo,
        registro:anexo11.informes,
        carrera: anexo11.carrera,
        nombreTutoremp: anexo11.nombretutoremp,
        observacionGeneral:anexo11.observaciones,
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
      saveAs(out, "Anexo11 " + anexo11.nombreest + ".docx");
    });
  }



anexo11ww:Anexo11=new Anexo11();
  guardarAnexo11(){
    //console.log(this.obtnerDatos())
    this.anexo11ww=this.obtnerDatos();
    this.anexo11Service.saveAnexo11(this.anexo11ww).subscribe(value => {
      Swal.fire({
        title: 'Resgitrado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    },error => {
      Swal.fire({
        title: 'error',
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
