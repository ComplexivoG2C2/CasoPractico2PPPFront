import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectoempService} from "../../../services/proyectoemp.service";
import {MatSelectionListChange} from "@angular/material/list";
import {ProyectoService} from "../../../services/proyecto.service";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {map, Observable, startWith} from "rxjs";
import {Anexo8Service} from "../../../services/anexo8.service";
import {Anexo8} from "../../../models/anexo8";
import {Anexo4} from "../../../models/anexo4";
import {Anexo13} from "../../../models/Anexo13";
import {DatePipe} from "@angular/common";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import {saveAs} from "file-saver";
// @ts-ignore
import PizZipUtils from "pizzip/utils";
import {LoginempresaComponent} from "../../auth/loginempresa/loginempresa.component";
import Swal from "sweetalert2";
import {Anexo13Service} from "../../../services/anexo13.service";


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
  selector: 'app-anexo13',
  templateUrl: './anexo13.component.html',
  styleUrls: ['./anexo13.component.css']
})
export class Anexo13Component implements OnInit {

  issloading = true;
  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirthFormGroup?: FormGroup;
  myControl = new FormControl();
  pryectoselect: Solicitudproyecto = new Solicitudproyecto();
  carrera?:string;
  filteredOptions?: Observable<Anexo8[]>;
  proyecto?: Anexo8[];
  proyecto13?:Solicitudproyecto = new Solicitudproyecto();
  cedula?:string;
  anexo13:Anexo13 = new Anexo13();
  anex13:Anexo13=new Anexo13();
  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private proyectoService: ProyectoService,
              private anexo8Service: Anexo8Service,
              private activatedRoute: ActivatedRoute,
              private anexo13S: Anexo13Service
              ) { }
  nombre?:string;
  email?:string;
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      let ced = params['cedula']
      let eml= params['email']
      let est = params['nombres']
      this.email= eml;
      this.nombre=est;
      this.cedula=ced;
      this.anexo8Service.getAnexo8byCedula(this.cedula).subscribe(value => {
        this.proyecto=value;
        this.issloading=false;

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filtera(values)),
        );
      });
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      area: new FormControl(),
      ciclo:new FormControl(),
      tiempo:new FormControl(),
      constitucion:new FormControl(),
      actividad: new FormControl(),
      principios:new FormControl(),
      mision:new FormControl(),
      vision:new FormControl(),
    });

    this.thirthFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });


  }


  filtera(value: any): Anexo8[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.proyecto.filter(option => option.cedulaEstudiante.toLowerCase().includes(filterValue)
    );
  }


  selectionProyecto(pryectoselect: MatSelectionListChange){
    this.pryectoselect = pryectoselect.option.value;
    console.log(this.pryectoselect)
    this.proyectoService.getSolicitudesbyid(Number(this.pryectoselect.id)).subscribe(value => {
      this.issloading=false;
      console.log(this.pryectoselect.id)
      console.log(value)
      this.proyecto13 = value;
      // this.anexo8Service.getAnexo8byProyecto(this.pryectoselect.id).subscribe(value=>{
      //     this.idProyecto=this.pryectoselect.id;
      //     this.fechaE=this.pryectoselect.fechaat;
      //     this.anexo13.cedulaEstudiante=this.cedula;
      //     this.idEm=this.pryectoselect.empresa;
      //     this.anexo13.nombreEmpresa= this.pryectoselect.nombreempresa;
      //     this.anexo13.nombreTutorEmpresarial= this.pryectoselect.nombretutoremp;
      //     this.anexo13.nombreEstudiante=this.pryectoselect.nombresolicitante;
      //     this.anexo13.fechaInicio=this.pryectoselect.fechaInicio;
      //     this.anexo13.fechaFin=this.pryectoselect.fechaFin;
      //     return this.pryectoselect;
      //     this.obtenerDatos(this.pryectoselect);
      //   })

      this.anexo8Service.getAnexo8byProyecto(this.pryectoselect.id).subscribe(value=>{
        this.proyecto=value;
      })

    })
  }

  obtenerDatos(proyecto13:Solicitudproyecto):Anexo13 {
    // @ts-ignore
    this.anexo13.idProyecto=proyecto13.id;
    this.anexo13.fechaEmision=proyecto13.fechaat;
    this.anexo13.cedulaEstudiante=this.cedula;
    this.anexo13.nombreEstudiante=this.nombre;
    this.anexo13.emailEstudiante=this.email;
    this.anexo13.idEmpresa=proyecto13.empresa;
    this.anexo13.nombreEmpresa= proyecto13.nombreempresa;
    this.anexo13.nombreTutorEmpresarial= proyecto13.nombretutoremp;
    this.anexo13.fechaInicio=proyecto13.fechaInicio;
    this.anexo13.fechaFin=proyecto13.fechaFin;
    console.log(this.anexo13)
    return this.anexo13;

  }

  generarDocumento(proyecto13:Solicitudproyecto) {
    var anexo:Anexo13=this.obtenerDatos(proyecto13);
    // console.log(anexo)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/darwin-g/src/assets/docs/Anexo13..docx", function(
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
        fecha_solicitud:pipe.transform(anexo.fechaEmision,'dd/MM/yyyy'),
        nombreEmpresa:anexo.nombreEmpresa,
        ubicacionEmpresa:anexo.ubicacionEmpresa,
        area:anexo.area,
        nombreTutorEmpresarial:anexo.nombreTutorEmpresarial,
        cargoTutorEmpresarial:anexo.cargoTutorEmpresarial,
        cedulaTutorEmpresarial:anexo.cedulaTutorEmpresarial,
        teléfonoTutorEmpresarial:anexo.teléfonoTutorEmpresarial,
        emailTutorEmpresarial:anexo.emailTutorEmpresarial,
        nombreEstudiante:anexo.nombreEstudiante,
        cedulaEstudiante:anexo.cedulaEstudiante,
        ciclo:anexo.ciclo,
        tiempo:anexo.tiempo,
        emailEstudiante:anexo.emailEstudiante,
        telefonoEstudiante:anexo.telefonoEstudiante,
        nombreTutorAcademico:anexo.nombreTutorAcademico,
        cedulaTutorAcademico:anexo.cedulaTutorAcademico,
        emailTutorAcademico:anexo.emailTutorAcademico,
        horas:anexo.horas,
        fechaInicio:anexo.fechaInicio,
        fechaFin:anexo.fechaFin,
        constitucion:anexo.constitucion,
        actividadPrincipal:anexo.actividadPrincipal,
        principiosEmpresa:anexo.principiosEmpresa,
        misionEmpresa:anexo.misionEmpresa,
        visionEmpresa:anexo.visionEmpresa

        /////todos los datos que se quieran enviar
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
      saveAs(out, "Anexo13.docx");
    });
  }

  subirDocumento( proyecto13:Solicitudproyecto, file: FileList) {
    // @ts-ignore
    this.obtenerDatos(proyecto13);
    if (file.length == 0) {
    } else {
      getBase64(file[0]).then(docx => {
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if (docx.length >= 10485760) {
          this.anexo13.documento = "";
          Swal.fire(
            'Error',
            'El documento es demasiado pesado',
            'warning'
          )
        } else {
          this.anexo13.documento = docx + "";
        }
      })
    }
  }

  guardarAnexo13(proyecto13:Solicitudproyecto){
    this.issloading = true;

    this.anexo13S.saveAnexo13(this.obtenerDatos(proyecto13)).subscribe(value => {
      Swal.fire({
        title: 'Convocatoria enviada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading = false;
      this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenida']);
    }, error => {
      if (error.error.message == "...@") {
        Swal.fire({
          title: 'enviado..',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.issloading = false;
        this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenida']);
      } else {
        Swal.fire({
          title: 'Ha ocurrido un ERROR',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.issloading = false;
      }
    })
  }
}
