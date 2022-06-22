import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {DateAdapter} from "@angular/material/core";

import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {map, Observable, startWith} from "rxjs";
import {Materias} from "../../../models/materias";
import {Anexo7} from "../../../models/anexo7";
import {Anexo1} from "../../../models/anexo1";
import {Anexo6} from "../../../models/anexo6";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo81} from "../../../models/anexo81";
import {Anexo81Service} from "../../../services/anexo81.service";
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
  selector: 'app-anexo81',
  templateUrl: './anexo81.component.html',
  styleUrls: ['./anexo81.component.css']
})
export class Anexo81Component implements OnInit {
  pipe: DatePipe = new DatePipe('en-US')

  isLinear = true;
  firstFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;

  issloading = true;
  isexist?: boolean;
  activate?: boolean = true;
  activar?: boolean = false;

  myControlproyecto = new FormControl();
  myControlanexo7 = new FormControl();
  filteredOptionsProyecto?: Observable<Solicitudproyecto[]>;
  filteredOptionsanexo7?: Observable<Anexo7[]>;
  proyectos: Solicitudproyecto[] = [];
  anexo7lista: Anexo7[] = [];

  proyectoselect: Solicitudproyecto = new Solicitudproyecto();
 anexo7select: Anexo7 = new Anexo7();
  anexo81: Anexo81 = new Anexo81();

  sum = 0;
  numerominimo = 0;

  anexo1: Anexo1[] = [];
  cedula?: String;
  anexo07: Anexo7 = new Anexo7();

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
              private anexo06Service: Anexo6Service,
              private anexo7Service: Anexo7Service,
              private cordinadorvinculacionService: CordinadorvinculacionService,
              private anexo81Service: Anexo81Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula = cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo7Service.getAnexo7().subscribe(value1 => {
          this.anexo7lista = value1.filter(value2 => value2.siglascarrera == value.filter(value1 => value1.cedula == cedula)[0].codigoCarrera);
          this.filteredOptionsanexo7= this.myControlanexo7.valueChanges.pipe(
            startWith(''),
            map(values => this.filteran7(values)),
          );
          this.issloading = false;
          this.isexist = true;
        })
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.anexo81.fechaNotificacion = value.fecha;
      })




    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({});

  }

  // filter(value: any): Solicitudproyecto[] {
  //   const filterValue = value.toLowerCase();
  //   return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
  //     || option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
  //   );
  // }

  filteran7(value: any): Anexo7[] {
    const filterValue = value.toLowerCase();
    return this.anexo7lista.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
      || option.nombreResponsable?.toLocaleLowerCase().includes(filterValue)
      || option.nombreTutoracademico?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaTutoracademico?.toLocaleLowerCase().includes(filterValue)
    );
  }


  selectionan7(anexo7select: MatSelectionListChange) {

    this.activate = true;
    this.anexo7select = anexo7select.option.value

    this.anexo7Service.getanexo7byid7(Number(this.anexo7select.id)).subscribe(value7 => {
      this.anexo81.carrera = value7.carrera
console.log("e seleecionado la convocatoria"+this.anexo81.carrera)
    })
  }

  obtnerdatos(): Anexo81 {
    this.anexo81.idProyectoPPP = this.anexo7select.idProyectoPPP;
    this.anexo81.nombreEmpresa = this.anexo7select.nombreEmpresa;
    this.anexo81.nombreResponsable = this.anexo7select.nombreResponsable;
    this.anexo81.nombreTutoracademico=this.anexo7select.nombreTutoracademico;
    this.anexo81.cedulaEstudiante=this.anexo7select.cedulaEstudiante;
    this.anexo81.cedulaTutoracademico=this.anexo7select.cedulaTutoracademico;
    this.anexo81.nombreEstudiante=this.anexo7select.nombreEstudiante;
    this.anexo81.carrera=this.anexo7select.carrera;
    // @ts-ignore
    this.anexo81.siglascarrera = this.anexo7select.siglascarrera;
    console.log("estas son las siglas de la carrera" + this.anexo81.siglascarrera)

    return this.anexo81;
  }


  guardaranexo81() {
    var anexo81 = this.obtnerdatos();
    this.anexo81Service.saveAnexo81(anexo81).subscribe(value => {
      Swal.fire({
        title: 'Notificacion enviada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate(['/panelusuario/gestionpracticasppp/anexo81listar', this.cedula])
    }, error => {
      if (error.error.message == "La fecha de inicio no puede ser mayor a la fecha fin") {
        Swal.fire({
          title: '....',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      } else {
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

  subirDocumento(file: FileList) {
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo81.documento = "";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        } else {
          this.anexo81.documento = docx + "";
        }
      })
    }
  }

  generarDocumento() {
    var anexo81: Anexo81 = this.obtnerdatos();
    //console.log(anexo6)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo81.docx", function (
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
        fecha: pipe.transform(anexo81.fechaNotificacion, 'dd/MM/yyyy'),
        empresa: anexo81.nombreEmpresa,
        nombreTutoracademico: anexo81.nombreTutoracademico,
        nombreEstudiante: anexo81.nombreEstudiante,
        carrera: anexo81.carrera,
        nombreResponsable: anexo81.nombreResponsable
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
      saveAs(out, "Anexo81 " + anexo81.nombreEstudiante + ".docx");
    });
  }
}
