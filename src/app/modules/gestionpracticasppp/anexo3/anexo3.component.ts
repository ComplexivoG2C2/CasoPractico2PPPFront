import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Anexo3} from "../../../models/anexo3";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
// @ts-ignore
import { saveAs } from 'file-saver';
import {DateAdapter} from "@angular/material/core";



// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";

import Docxtemplater from "docxtemplater";
import {Anexo2} from "../../../models/anexo2";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {ExtrasService} from "../../../services/extras.service";
import {MateriasService} from "../../../services/materias.service";
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
  selector: 'app-anexo3',
  templateUrl: './anexo3.component.html',
  styleUrls: ['./anexo3.component.css']
})
export class Anexo3Component implements OnInit {
  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  cedula?:String;
  anexo2receptables:Anexo2[]=[];
  anexo2noanexo2receptables:Anexo2[]=[];


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
              private otrosService:ExtrasService,
              private materiasService:MateriasService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.otrosService.getCarrera(cedula).subscribe(value => {
        this.anexo2Service.getAnexo2().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera).length!=0;
          this.fechaService.getSysdate().subscribe(fecha => {
            // @ts-ignore
            this.anexo2receptables=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera&&value2.fechaMaxRecepcion>=fecha.fecha)
            // @ts-ignore
            this.anexo2noanexo2receptables=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera&&value2.fechaMaxRecepcion<fecha.fecha)
          })
          this.issloading=false;
        })
      })
      this.anexo3Service.getAnexo3byCedula(cedula).subscribe(value => {
        // console.log(value)
      })
    })
  }


  aux: number = 0;
  aux2: number = 0;
  postular(anexo2:Anexo2){
    var anexo3:Anexo3=this.obtnerDatos(anexo2)
    this.aux = 0;
    this.aux2 = 0;
    this.anexo3Service.getAnexo3byCedula(this.cedula+"").subscribe(value => {
      if(value.filter(value1 => value1.idProyectoPPP==anexo2.idProyectoPPP).length!=0){
        Swal.fire({
          title: 'En Proceso, Usted ya postulo en esta convocatoria',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }else{
        this.materiasService.getMateriasbyAlumno(this.cedula+"").subscribe(async value1 => {
          for (let i = 0; i < value1.materias!.length; i++) {
            for (let j = 0; j < anexo2.materias!.length; j++) {
              if (value1.materias![i].nombre == anexo2.materias![j].nombre) {
                this.aux2++;
                console.log('la respuesta es' + this.aux2);
              }
            }
          }
          if (this.aux2 === anexo2.materias!.length) {
            console.log("Si cumple con los requisitos para postular")
            Swal.fire({
              allowOutsideClick: false,
              allowEnterKey:false,
              allowEscapeKey:false,
              title: 'Proceso de Postulacion',


              showDenyButton: true,
              showCancelButton: true,
              cancelButtonText: 'Salir',
              confirmButtonText: 'Descargar Documento',
              denyButtonText: `Subir Documento`,
              denyButtonColor: "#3cb227",
              color: "#000000",
              confirmButtonColor: "#0086ff",
              background: "#ffffff",
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.generarDocumento(anexo2);
              } else if (result.isDenied) {
                const {value: file} = await Swal.fire({
                  allowOutsideClick: false,
                  allowEnterKey:false,
                  allowEscapeKey:false,
                  showCancelButton: true,
                  confirmButtonText:"Enviar postulaci??n",
                  color: "#090000",
                  confirmButtonColor: "#0081f6",
                  background: "#ffffff",
                  title: 'Confirmaci??n',
                  text: 'Debe subir el documento en formato "PDF"',
                  input: 'file',
                  inputAttributes: {
                    'accept': 'application/pdf',
                    'aria-label': 'Debe subir la convocatoria en formato PDF'
                  },
                  inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (value === null) {
                        resolve('Es necesario que seleccione el PDF del anexo')
                      } else {
                        getBase64(value).then(docx => {
                          anexo3.documento = docx + '';
                          this.anexo3Service.saveAnexo3(anexo3).subscribe(value2 => {
                            Swal.fire({
                              title: 'Solicitud enviada',
                              showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                              },
                              hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                              }
                            })
                            this.issloading = false;
                            this.router.navigate(['/panelusuario/gestionpracticasppp/estadossolicitud', this.cedula]);
                          },error => {
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
                          // console.log(anexo3)
                        })
                      }
                    })
                  }
                })
              }
            })

          } else {
            Swal.fire({
              title: 'No cumple los requisitos para postular',
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
    })
  }

  anexo3response:Anexo3 = new Anexo3();
  obtnerDatos(anexo2: Anexo2):Anexo3{
    this.anexo3response.siglas_carrera=anexo2.siglasCarrera;
    this.anexo3response.nombrecarrera=anexo2.carrera;
    this.anexo3response.nombreproyecto=anexo2.nombreProyecto;
    this.anexo3response.idProyectoPPP=anexo2.idProyectoPPP;
    this.anexo3response.ciclo=anexo2.ciclo;
    this.anexo3Service.getDocenteTitulo(anexo2.siglasCarrera).subscribe(value => {
      this.anexo3response.titulo_responsable=value.titulo;
    })
    this.anexo3Service.getDatosAlimnobyCedula(this.cedula+"").subscribe(value => {
      this.anexo3response.nombresestudiante=value.primerNombre+" "+value.segundoNombre;
      this.anexo3response.apellidosestudiante=value.primerApellido+" "+value.segundoApellido;
      this.anexo3response.jornada=value.jornada;
      this.anexo3response.paralelo=value.paralelo;
    })
    this.anexo3response.cedula=this.cedula;
    this.fechaService.getSysdate().subscribe(data=>{
      this.anexo3response.fecha_solicitud=data.fecha;});
    this.anexo3response.nombre_responsable=anexo2.nombreResponsable
    this.anexo3response.num_proceso=1;
    this.anexo3response.estado="PN";
    return this.anexo3response;
  }

  generarDocumento(anex2:Anexo2) {
    console.log(this.obtnerDatos(anex2))
    var pipe: DatePipe = new DatePipe('en-US')
    var anexo3:Anexo3=this.obtnerDatos(anex2);
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo3.docx", function(
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
        titulo:anexo3.titulo_responsable,
        nombre_responsable:anexo3.nombre_responsable,
        siglas:anexo3.siglas_carrera,
        nombreEstudiante:anexo3.nombresestudiante+" "+anexo3.apellidosestudiante,
        cedula:anexo3.cedula,
        nombrecarrera:anexo3.nombrecarrera,
        fecha:pipe.transform(anexo3.fecha_solicitud, 'dd/MM/yyyy'),
        paralelo:anexo3.paralelo,
        jornada:anexo3.jornada,
        empresa:anexo3.nombreproyecto,
        ciclo:anexo3.ciclo,
        num_convocatoria:anexo3.num_proceso
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
      saveAs(out, "Anexo3 de "+anexo3.apellidosestudiante+".docx");
    });
  }


  convertFile(docum:any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo3.pdf');
    // console.log(file);
    saveAs(file, 'Anexo3.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
