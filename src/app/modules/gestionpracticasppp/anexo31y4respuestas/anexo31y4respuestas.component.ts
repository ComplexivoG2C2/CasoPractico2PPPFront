import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {actividadeslistProyectos, Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Actividadesanexo, Anexo2} from "../../../models/anexo2";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {MatSelectionListChange} from "@angular/material/list";
import Swal from "sweetalert2";
import Docxtemplater from "docxtemplater";



// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import { DatePipe } from '@angular/common';
import {Materias} from "../../../models/materias";
import {CarrerasService} from "../../../services/carreras.service";
import {MateriasService} from "../../../services/materias.service";
import {Anexo4, ListaEstudiantesAnexo4Request} from "../../../models/anexo4";
import {Anexo3} from "../../../models/anexo3";
import {DateAdapter} from "@angular/material/core";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo31y4respuestasService} from "../../../services/anexo31y4respuestas.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo8} from "../../../models/anexo8";
import {Anexo31} from "../../../models/anexo31";
import {Anexo31Service} from "../../../services/anexo3-1.service";

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
  selector: 'app-anexo31y4respuestas',
  templateUrl: './anexo31y4respuestas.component.html',
  styleUrls: ['./anexo31y4respuestas.component.css']
})
export class Anexo31y4respuestasComponent implements OnInit {

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirthFormGroup?: FormGroup;
  issloading = true;
  proyecto: Solicitudproyecto[] = [];
  pryectoselect: Solicitudproyecto = new Solicitudproyecto();
  myControl = new FormControl();
  filteredOptions?: Observable<Solicitudproyecto[]>;
  anexo4: Anexo4 = new Anexo4();
  anexo31:Anexo31=new Anexo31();
  anexo3: Anexo3[] = [];
cedula?:String
  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private fechaService: FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService,
              private responsablepppService: ResponsablepppService,
              private empresaService: EmpresaService,
              private _adapter: DateAdapter<any>,
              private anexo2Service: Anexo2Service,
              private anexo3Service: Anexo3Service,
              private anexo8Service: Anexo8Service,
              private anexo31Service:Anexo31Service,
              private cordinadorvinculacionService: CordinadorvinculacionService,
              private  anexo4Service: Anexo31y4respuestasService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula=cedula
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          this.proyecto = value1.filter(value2 => value2.estado == true && value2.codigocarrera == value.filter(value1 => value1.cedula == cedula)[0].codigoCarrera);
          this.cordinadorvinculacionService.getCordinadorVinculacioAll().subscribe(da => {
            this.anexo4.nombreResponsable= da.nombres + " " + da.apellidos
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(values => this.filter(values)),
            );
            this.issloading = false;
          })
        })
      })
    })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirthFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
  }

  filter(value: any): Solicitudproyecto[] {
    const filterValue = value.toLowerCase();
    return this.proyecto.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionProyecto(pryectoselect: MatSelectionListChange) {
    this.anexo8Service.getAnexo8All().subscribe(value2 => {
      if (value2.filter(value3 => value3.idProyectoPPP == pryectoselect.option.value.id).length == 0) {
        Swal.fire({
          text: 'No hay alumnos aceptados o denegados en esta convocatoria',
          icon: 'success',
          color: "#000000",
          confirmButtonColor: "#0080f8",
          background: "#ffffff",
        })
        window.location.reload();
      } else {
        this.pryectoselect = pryectoselect.option.value;
        this.anexo3Service.getAnexo3byProyecto(this.pryectoselect.id).subscribe(value => {
          this.anexo4.idProyectoPPP = this.pryectoselect.id;
          this.anexo4.nombreEmpresa = this.pryectoselect.nombre
          this.anexo4.nombreResponsable = this.pryectoselect.nombreresponsable
          this.anexo4.nombreRepresentanteEmp=this.pryectoselect.nombresolicitante
          this.anexo4.carrera = this.pryectoselect.carrera;
          this.anexo4.fechaSolicitudEmp=this.pryectoselect.fechaat;
          this.anexo4.cargoEmpresa=this.pryectoselect.cargosolicitante
          this.anexo3 = value;

          ///anexo31
        })
      }
    })
  }

  alumnosselc: ListaEstudiantesAnexo4Request[] = [];
  obtnerdatos(): Anexo4 {
    this.alumnosselc.length = 0;
    this.anexo3.forEach(value => {
      this.alumnosselc.push({
        cedula: value.cedula,
        nombre: value.nombresestudiante+''+value.apellidosestudiante,
      })
    })
    this.fechaService.getSysdate().subscribe(value => {
      // @ts-ignore
      this.anexo4.fechaRespuesta = value.fecha + "";
      this.anexo4.listaEstudiantes = this.alumnosselc;

    })
    return this.anexo4;
  }


  obtnerdatosanexo31(): Anexo31 {

    this.fechaService.getSysdate().subscribe(value => {
      // @ts-ignore
      this.anexo31.fechaRespuesta = value.fecha + "";
      this.anexo31.fechaSolicitudEmp = value.fecha;

    })
    return this.anexo31;
  }



  guardarAceptacion() {
    var anexo4: Anexo4 = this.obtnerdatos();
    this.anexo4Service.saveAnexo4(anexo4).subscribe(value => {
      Swal.fire({
        title: 'Éxito',
        text: 'Informe guardado exitosamente',
        icon: 'success',
        color: "#000102",
        confirmButtonColor: "#0082fa",
        background: "#ffffff",
      })
      this.router.navigate(['/panelusuario/gestionpracticasppp/veranexo31y4respuestas', anexo4.nombreResponsable])
    }, error => {
      Swal.fire({
        title: 'Ha surgido un error',
        text: "Hubo un error",
        icon: 'error',
        color: "#000000",
        confirmButtonColor: "#0086ff",
        background: "#fcfcfc",
      })
    })
  }






  async aceptarPostulacion(anexo4: Anexo4) {
    // @ts-ignore
    var anexo4=this.obtnerdatos(anexo4);
    Swal.fire({
      allowOutsideClick: false,
      allowEnterKey:false,
      allowEscapeKey:false,
      text: 'Para enviar la respuesta a la empresa descague el Anexo (A4) y subalo',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Salir',
      confirmButtonText: 'Generar Anexo',
      denyButtonText: `Enviar Respuesta`,
      denyButtonColor: "#3cb227",
      color: "#070000",
      confirmButtonColor: "#007cff",
      background: "#ffffff",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          // @ts-ignore
        this.generarDocumento(anexo4);
      } else if (result.isDenied) {


          // console.log(anexo.razon)
          const {value: file} = await Swal.fire({
            allowOutsideClick: false,
            allowEnterKey:false,
            allowEscapeKey:false,
            showCancelButton: true,
            confirmButtonText:"Enviar Respuesta",
            color: "#000000",
            confirmButtonColor: "#007cff",
            background: "#ffffff",
            text: 'Suba el documento',
            input: 'file',
            inputAttributes: {
              'accept': 'application/pdf',
              'aria-label': 'Debe subir el documento en formato PDF'
            },
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === null) {
                  resolve('Es necesario que seleccione el PDF del anexo')
                } else {
                  this.issloading=true;
                  getBase64(value).then(docx => {
                    anexo4.documento = docx + '';
                    this.anexo4Service.saveAnexo4(anexo4).subscribe(value1 => {

                        Swal.fire({
                          title: 'Respuesta enviada a la empresa',
                          showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                          },
                          hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                          }
                        })
                        this.router.navigate(['/panelusuario/gestionpracticasppp/versolicitudesestudiantes',this.cedula]);

                    },error => {
                      Swal.fire({
                        title: 'error..',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                      this.issloading=false;
                    })
                  })
                }
              })
            }
          })
      }
    })
  }





  async negarPostulacion(anexo31: Anexo31) {
    // @ts-ignore
    var anexo31=this.obtnerdatosanexo31(anexo31);
    Swal.fire({
      allowOutsideClick: false,
      allowEnterKey:false,
      allowEscapeKey:false,
      text: 'Para enviar la respuesta a la empresa descague el Anexo (A4) y subalo',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Salir',
      confirmButtonText: 'Generar Anexo',
      denyButtonText: `Enviar Respuesta`,
      denyButtonColor: "#3cb227",
      color: "#070000",
      confirmButtonColor: "#007cff",
      background: "#ffffff",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // @ts-ignore
        this.generarDocumentoAnexo3_1(anexo31);
      } else if (result.isDenied) {


        // console.log(anexo.razon)
        const {value: file} = await Swal.fire({
          allowOutsideClick: false,
          allowEnterKey:false,
          allowEscapeKey:false,
          showCancelButton: true,
          confirmButtonText:"Enviar Respuesta",
          color: "#000000",
          confirmButtonColor: "#007cff",
          background: "#ffffff",
          text: 'Suba el documento',
          input: 'file',
          inputAttributes: {
            'accept': 'application/pdf',
            'aria-label': 'Debe subir el documento en formato PDF'
          },
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === null) {
                resolve('Es necesario que seleccione el PDF del anexo')
              } else {
                this.issloading=true;
                getBase64(value).then(docx => {
                  anexo31.documento = docx + '';
                  this.anexo31Service.saveAnexo31(anexo31).subscribe(value1 => {

                    Swal.fire({
                      title: 'Respuesta enviada a la empresa',
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                    })
                    this.router.navigate(['/panelusuario/gestionpracticasppp/versolicitudesestudiantes',this.cedula]);

                  },error => {
                    Swal.fire({
                      title: 'error..',
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                    })
                    this.issloading=false;
                  })
                })
              }
            })
          }
        })
      }
    })
  }




  generarDocumento() {
    this.obtnerdatos();
    var a: Anexo4 = this.obtnerdatos();
    //console.log(informe)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo4.docx", function (
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
        carrera: a.carrera,
        fecha:a.fechaRespuesta,
        fechaEmitida:a.fechaSolicitudEmp,
        cargo:a.cargoEmpresa,
        empresa: a.nombreEmpresa,
        nombrerepresentante: a.nombreRepresentanteEmp,
        tb1: a.listaEstudiantes,
        nombreResposable: a.nombreResponsable,
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
      saveAs(out, "Respuesta a la empresa (A4).docx");
    });
  }

  subirDocumento(file: FileList) {
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        // console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo4.documento = "";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        } else {
          this.anexo4.documento = docx + "";
        }
      })
    }
  }




  generarDocumentoAnexo3_1() {
    this.obtnerdatos();
    var a: Anexo31 = this.obtnerdatosanexo31();
    //console.log(informe)
    var pipe: DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo3_1.docx", function (
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
        carrera: a.carrera,
        fecha:a.fechaRespuesta,
        fechaSolicitudEmp:a.fechaSolicitudEmp,
        cargoEmpresa:a.cargoEmpresa,
        empresa: a.nombreEmpresa,
        nombreRepresentanteEmp: a.nombreRepresentanteEmp,
        nombreResposable: a.nombreResponsable,
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
      saveAs(out, "Respuesta a la empresa (A3.1).docx");
    });
  }

  subirDocumentoAnexo3_1(file: FileList) {
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        // console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo31.documento = "";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        } else {
          this.anexo31.documento = docx + "";
        }
      })
    }
  }
}
