import { Component, OnInit , ViewChild} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {Anexo3} from "../../../models/anexo3";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {Anexo2} from "../../../models/anexo2";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo8} from "../../../models/anexo8";
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
  selector: 'app-versolicitudesestudiante',
  templateUrl: './versolicitudesestudiante.component.html',
  styleUrls: ['./versolicitudesestudiante.component.css']
})
export class VersolicitudesestudianteComponent implements OnInit {

  issloading=true;
  isexist?:boolean

  anexo3pendientes:Anexo3[]=[];
  anexo3aceptados:Anexo3[]=[];
  anexo3rechazados:Anexo3[]=[];

  cedula?:String;

  proyecto:Solicitudproyecto[]=[];

  //tablas
  displayedColumns: string[] = ['cedula','nombresestudiante','paralelo','nombreproyecto','fecha_solicitud','documento','aceptar','denegar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Anexo3>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  myControla = new FormControl();
  filteredOptionsa?: Observable<Anexo3[]>;
  myControlr = new FormControl();
  filteredOptionsr?: Observable<Anexo3[]>;

  constructor(private router: Router,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,

              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo8Service:Anexo8Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula
      this.cargarpostulaiones(cedula);
    })
  }

  cargarpostulaiones(cedula:String){
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getSolicitudes().subscribe(value1 => {
        this.proyecto=value1.filter(value2 => value2.codigocarrera==value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera&&value2.estado==true);
      })
      this.anexo3Service.getAnexo3byCodigoCorrera(value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera).subscribe(value1 => {
        this.isexist=value1.length!=0;
        this.anexo3pendientes=value1.filter(value2 => value2.estado=="PN")
        this.anexo3aceptados=value1.filter(value2 => value2.estado=="AN")
        this.filteredOptionsa = this.myControla.valueChanges.pipe(
          startWith(''),
          map(values=>this.filtera(values)),
        );
        this.anexo3rechazados=value1.filter(value2 => value2.estado=="DN")
        this.issloading=false;
        this.filteredOptionsr = this.myControlr.valueChanges.pipe(
          startWith(''),
          map(values=>this.filterr(values)),
        );
      })
    })
  }

  proyetoFilterp(event: any){
    //console.log(this.anexo3pendientes)
    if(event+""!="ND"){
      this.dataSource = new MatTableDataSource(this.anexo3pendientes.filter(value => value.nombreproyecto==event+""));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else {
      this.dataSource = new MatTableDataSource(this.anexo3pendientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  proyetoFiltera(event: any){
    // console.log(this.anexo3pendientes)
    if(event+""!="ND"){
      this.dataSource = new MatTableDataSource(this.anexo3pendientes.filter(value => value.nombreproyecto==event+""));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else {
      this.dataSource = new MatTableDataSource(this.anexo3pendientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtera(value: any): Anexo3[] {
    const filterValue = value.toLowerCase();
    return this.anexo3aceptados.filter(option => option.cedula?.toLowerCase().includes(filterValue)
      ||option.nombreproyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombresestudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.apellidosestudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.ciclo?.toLocaleLowerCase().includes(filterValue)
    );
  }
  filterr(value: any): Anexo3[] {
    const filterValue = value.toLowerCase();
    return this.anexo3rechazados.filter(option => option.cedula?.toLowerCase().includes(filterValue)
      ||option.nombreproyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombresestudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.apellidosestudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.ciclo?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async aceptarPostulacion(anexo: Anexo3) {
    var anexo8=this.obtnerdatos(anexo);
    Swal.fire({
      allowOutsideClick: false,
      allowEnterKey:false,
      allowEscapeKey:false,
      text: 'Para enviar la respuesta al estudiante descague el Anexo y subalo',
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
        const { value: number } = await Swal.fire({
          allowOutsideClick: false,
          allowEnterKey:false,
          allowEscapeKey:false,
          showCancelButton: true,
          cancelButtonText: 'Salir',
          title: 'Ingrese el número horas necesarias para cumplir con el proceso de Practicas Preprofesionales',
          input: 'number',
          inputLabel: 'Número de horas',
          inputPlaceholder: '',
          color: "#050000",
          confirmButtonColor: "#0088ff",
          background: "#ffffff",
        })
        if (number) {
          anexo8.numeroHoras=number;
          //console.log(anexo4.numeroHoras)
          this.generarDocumento(anexo8);
        }
      } else if (result.isDenied) {
        const {value: text} = await Swal.fire({
          allowOutsideClick: false,
          allowEnterKey:false,
          allowEscapeKey:false,
          input: 'textarea',
          color: "#000103",
          confirmButtonColor: "#0081f6",
          confirmButtonText: "Siguiente",
          background: "#ffffff",
          cancelButtonText: 'Salir',
          text:"Escriba el Motivo de la Aceptacion",
          inputPlaceholder: ' ',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        })
        if (text) {
          anexo.razon=text;
          anexo.estado="AN";
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
                    anexo8.documento = docx + '';
                    this.anexo8Service.saveAnexo8(anexo8).subscribe(value1 => {
                      this.anexo3Service.updateAnexo3(anexo).subscribe(value => {
                        Swal.fire({
                          title: 'El estudiante a sido aceptado',
                          showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                          },
                          hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                          }
                        })
                        this.cargarpostulaiones(this.cedula+"")
                        this.router.navigate(['/panelusuario/gestionpracticasppp/versolicitudesestudiantes',this.cedula]);
                       /////recarga pantalla
                        window.location.reload();
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
                      })
                      this.issloading=false;
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
      }
    })
  }
  anexoresponse:Anexo8 = new Anexo8();
  obtnerdatos(anexo3:Anexo3):Anexo8{
    this.anexoresponse.idProyectoPPP=anexo3.idProyectoPPP;
    this.anexoresponse.nombreEstudiante=anexo3.nombresestudiante+" "+anexo3.apellidosestudiante;
    this.anexoresponse.nombreResponsable=anexo3.nombre_responsable;
    this.anexoresponse.nombreProyecto=anexo3.nombreproyecto;
    this.anexoresponse.siglasCarrera=anexo3.siglas_carrera;
    this.fechaService.getSysdate().subscribe(data=>{
      this.anexoresponse.fechaRespuesta=data.fecha;});
    this.anexoresponse.cedulaEstudiante=anexo3.cedula;
    this.anexoresponse.num_proceso=1;
    return this.anexoresponse;
  }


  async denegarPostulacion(anexo: Anexo3) {
    const {value: text} = await Swal.fire({
      allowOutsideClick: false,
      allowEnterKey:false,
      allowEscapeKey:false,
      input: 'textarea',
      color: "#000103",
      confirmButtonColor: "#0088ff",
      confirmButtonText: "Enviar Denegacion",
      background: "#ffffff",
      cancelButtonText: 'Salir',
      text:"Escriba el Motivo de la denegacion",
      inputPlaceholder: ' ',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (text) {
      this.issloading=true;
      anexo.razon=text;
      anexo.estado="DN";
      this.anexo3Service.updateAnexo3(anexo).subscribe(value => {
        Swal.fire({
          title: 'Solicitud denegada..',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.cargarpostulaiones(this.cedula+"")
        this.router.navigate(['/panelusuario/gestionpracticasppp/versolicitudesestudiante',this.cedula]);
        /////recarga pantalla
        window.location.reload();
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
    }
  }


  generarDocumento(anexo8:Anexo8) {
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo8.docx", function(
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
        fecha: pipe.transform(anexo8.fechaRespuesta,'dd/MM/yyyy'),
        nombre_estudiante:anexo8.nombreEstudiante,
        empresa:anexo8.nombreProyecto,
        siglas_carrera:anexo8.siglasCarrera,
        horas:anexo8.numeroHoras,
        nom_responsable:anexo8.nombreResponsable
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
        console.log(JSON.stringify({ error: error }, replaceErrors));
        // @ts-ignore
        if (error.properties && error.properties.errors instanceof Array) {
          // @ts-ignore
          const errorMessages = error.properties.errors
            // @ts-ignore
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
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
      saveAs(out, "Anexo 8 aceptacion al estudiante "+ anexo8.nombreEstudiante+".docx");
    });
  }

  convertFile(docum:any) {
    // console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo3.pdf');
    // console.log(file);
    saveAs(file, 'Anexo3.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    try {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });

    } catch (error) {
      let arr = dataurl,
        mime = arr,
        bstr = atob(arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }

}
