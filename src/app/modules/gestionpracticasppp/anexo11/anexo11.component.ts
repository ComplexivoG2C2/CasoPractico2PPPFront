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

  anexo1:Anexo1 = new Anexo1();
  anexo6:Anexo6= new Anexo6();
  proyecto:Solicitudproyecto= new Solicitudproyecto();
  empresa:Empresa = new Empresa();
  isexist?:boolean=true;
  issloading=true;

  anexo8:Anexo8[]=[];

  Informe:ListVisitaRequest=new ListVisitaRequest();

  // @ts-ignore
  addForm: FormGroup;
  rows: FormArray;
nombre?:String;
  anexo7select: Anexo7 = new Anexo7();

  constructor(private _formBuilder: FormBuilder,
              private fechaService:FechaService,private carrerasService:CarrerasService,
              private activatedRoute: ActivatedRoute,
              private empresaService:EmpresaService,
              private anexo6Service:Anexo6Service,
              private anexo1Service:Anexo1Service,
              private router:Router,
              private proyectoService:ProyectoService,
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
      this.anexo1Service.getAnexo1byCedula(cedula).subscribe(value => {
        this.anexo1=value[value.length-1]
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

        this.anexo8Service.getAnexo8All().subscribe(value2 => {
          this.anexo8=value2.filter(value3 => value3.idProyectoPPP==this.anexo1.idProyectoPPP&&value3.num_proceso==2)
          this.proyectoService.getSolicitudesbyid(Number(this.anexo1.idProyectoPPP)).subscribe(value2 => {
            this.proyecto=(value2.estado==true)?value2:new Solicitudproyecto();
            if(value2.estado==false){
              Swal.fire({
                title: 'no nay registros',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }
            this.empresaService.getsaveEmpresabyId(Number(this.proyecto.empresa)).subscribe(value3 => {
              this.empresa=value3
              this.anexo2Service.getAnexoByidProyecto(Number(this.anexo1.idProyectoPPP)).subscribe(value4 => {
                this.anexo11.ciclo=value4.ciclo;
                this.responsablepppService.getResposablepppbyCarrera(value4.siglasCarrera+'').subscribe(value5 => {
                  this.anexo11.periodoAcademicon=value5.fecha_inicio_periodo+" "+value5.fecha_fin_periodo;
                  this.anexo11Service.getAnexo11by(Number(this.anexo1.idProyectoPPP)).subscribe(value6 => {
                    if(value6.length==0){
                      this.onAddRow(this.Informe)
                      this.issloading=false;
                    }else {
                      this.anexo11=value6[0];
                      // @ts-ignore
                      value6[0].informes.forEach(value7 => {
                        this.issloading=false;
                        this.onAddRow(value7)
                      })
                    }

                  })
                })
              })
            })

          })
        })
      })
    })
    this.addForm.get("items_value")?.setValue("yes");
    this.addForm.addControl('rows', this.rows);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({});
    this.fourFormGroup = this._formBuilder.group({});
  }

  selectionan7(anexo7select: MatSelectionListChange) {

    this.anexo7select = anexo7select.option.value

    this.anexo7Service.getanexo7byid7(Number(this.anexo7select.id)).subscribe(value7 => {
      this.anexo11.carrera = value7.carrera
      console.log("e seleecionado la convocatoria"+this.anexo11.carrera)
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
  estudiantesVisitaRequest:EstudiantesVisitaRequest[]=[];
  obtnerDatos():Anexo11{
    this.estudiantesVisitaRequest.length=0;
    this.anexo8.forEach(value => {
      this.estudiantesVisitaRequest.push({
        cedula:value.cedulaEstudiante,
        nombre:value.nombreEstudiante,
      })
    })
    this.anexo11.cedulaDirectorDocenteApoyo=this.anexo1.cedulaDelegado;
    this.anexo11.nombreDirectorDocenteApoyo=this.anexo1.nombreDelegado;
    this.anexo11.nombreest=this.anexo7select.nombreEstudiante;
    ///falta tutor
this.anexo11.cedulaest=this.anexo7select.cedulaEstudiante;
    this.anexo11.empresa=this.empresa.nombre;
    this.anexo11.proyectoId=this.proyecto.id;
    this.anexo11.siglascarrera=this.anexo7select.siglascarrera;
    this.anexo11.representanteLegal=this.empresa.representante;
    this.anexo11.estudiantesVisitas=this.estudiantesVisitaRequest;
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




  guardarAnexo11(){
    //console.log(this.obtnerDatos())
    this.anexo11Service.saveAnexo11(this.obtnerDatos()).subscribe(value => {
      Swal.fire({
        title: 'Resgitrado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
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
    })

  }


}
