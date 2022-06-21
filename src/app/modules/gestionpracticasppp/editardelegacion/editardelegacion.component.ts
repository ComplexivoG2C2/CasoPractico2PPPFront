import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Anexo8} from "../../../models/anexo8";
import {map, Observable, startWith} from "rxjs";
import {AlumnosAnexo6, Anexo6} from "../../../models/anexo6";
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


import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";


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
  selector: 'app-editardelegacion',
  templateUrl: './editardelegacion.component.html',
  styleUrls: ['./editardelegacion.component.css']
})
export class EditardelegacionComponent implements OnInit {


  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading = true;


  myControlAnexe4 = new FormControl();
  filteredOptionsAnexe4?: Observable<Anexo8[]>;
  alumnosAnexe8: Anexo8[] = [];
  alumnoselect: Anexo8[] = [];

  anexo6: Anexo6 = new Anexo6();

  cedula?: String;

  constructor(private router: Router,
              private fechaService: FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService,
              private responsablepppService: ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service: Anexo2Service,
              private anexo3Service: Anexo3Service,
              private anexo8Service: Anexo8Service,
              private anexo1Service: Anexo1Service,
              private anexo6Service: Anexo6Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let cedula = params['cedula']
      this.cedula = cedula;
      this.anexo6Service.getAnexo6byId(id).subscribe(anex6 => {
        this.anexo6 = anex6;
        this.anexo8Service.getAnexo8All().subscribe(value => {
          value.filter(value1 => value1.idProyectoPPP == anex6.idProyectoPPP && value1.num_proceso == 2).forEach((value1, index) => {
            this.anexo6Service.getDocentesApoyo(value1.cedulaEstudiante, value1.idProyectoPPP).subscribe(value2 => {
              this.alumnosAnexe8.push(value1)
              if (anex6.alumnos?.filter(valu => valu.cedulaEstudiante == value1.cedulaEstudiante)) {
                this.alumnoselect.push(value1)
              }
              this.filteredOptionsAnexe4 = this.myControlAnexe4.valueChanges.pipe(
                startWith(''),
                map(values => this.filterAnexo4(values)),
              );
            })
          })
        })
        this.issloading = false;
      })
    })

    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.thirtdFormGroup = this._formBuilder.group({});
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
  }

  filterAnexo4(value: any): Anexo8[] {
    const filterValue = value.toLowerCase();
    return this.alumnosAnexe8.filter(option => option.siglasCarrera?.toLowerCase().includes(filterValue)
      || option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      || option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      || option.nombreRepresentante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  addAlumnos(anexo: Anexo8) {
    // console.log(anexo)
    if (this.alumnoselect.filter(value => value.cedulaEstudiante == anexo.cedulaEstudiante).length == 0) {
      this.alumnoselect.push(anexo);
    }
  }

  removeAlumnos(anexo: Anexo8) {
    this.alumnoselect.forEach((element, index) => {
      if (element.cedulaEstudiante == anexo.cedulaEstudiante) this.alumnoselect.splice(index, 1);
    });
  }


  public anexo6resposae: Anexo6 = new Anexo6;
  public alumnosAnexo5: AlumnosAnexo6[] = [];

  obtnerDatos(): Anexo6 {
    this.alumnosAnexo5.length = 0;
    this.anexo6resposae = this.anexo6;
    this.alumnoselect.forEach((value, index) => {
      this.alumnosAnexo5.push({
        nombreEstudiante: value.nombreEstudiante + "",
        cedulaEstudiante: value.cedulaEstudiante + ""
      })
    })
    this.anexo6resposae.alumnos = this.alumnosAnexo5;
    this.anexo6resposae.num_proceso = 1;
    return this.anexo6resposae
  }


  generarAnexo() {
    if (this.alumnoselect.length == 0) {
      Swal.fire({
        title: 'no a seleccionado estudiantes',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      this.generarDocumento(this.obtnerDatos())
    }
  }

  guardarAnexo() {
    if (this.alumnoselect.length == 0) {
      Swal.fire({
        title: 'no a seleccionado estudiantes',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      this.anexo6Service.updateAnexo6(this.obtnerDatos()).subscribe(value => {
        Swal.fire({
          title: 'Actualizado',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.router.navigate(['/panelusuario/gestionpracticasppp/anexo6listar', this.cedula]);
      }, error => {
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

  subirDocumento(file: FileList) {
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        // console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo6resposae.documento = "";
          Swal.fire(
            'Fallo',
            'El documento es demaciado pesado',
            'warning'
          )
        } else {
          this.anexo6resposae.documento = docx + "";
        }
      })
    }
  }


  generarDocumento(anexo6: Anexo6) {
    //console.log(anexo5)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo6.docx", function (
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
      saveAs(out, "Anexo6 de " + anexo6.nombreDocenteReceptor + ".docx");
    });
  }
}
