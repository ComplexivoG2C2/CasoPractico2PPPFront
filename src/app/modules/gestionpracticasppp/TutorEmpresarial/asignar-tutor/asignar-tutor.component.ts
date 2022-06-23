import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TutorEmpresarial} from "../../../../models/tutorEmpresarial";
import {TutempresarialService} from "../../../../services/tutempresarial.service";
import {EmpresaService} from "../../../../services/empresa.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo5} from "../../../../models/anexo5";
import {FechaService} from "../../../../services/fecha.service";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
// @ts-ignore
import PizZipUtils from "pizzip/utils";
// @ts-ignore
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import {saveAs} from "file-saver";
import {Anexo5Service} from "../../../../services/anexo5.service";
import {Solicitudproyecto} from "../../../../models/solicitudproyecto";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Anexo3Service} from "../../../../services/anexo3.service";
import {Anexo3} from "../../../../models/anexo3";

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
  selector: 'app-asignar-tutor',
  templateUrl: './asignar-tutor.component.html',
  styleUrls: ['./asignar-tutor.component.css']
})
export class AsignarTutorComponent implements OnInit {

  isLinear = true;
  primerForm!: FormGroup;
  segundoForm!: FormGroup;
  tutorEmpresarial?: TutorEmpresarial[];
  idEmpresa?:number;
  proyecto?:number;
  myControl = new FormControl();
  filteredOptions?: Observable<TutorEmpresarial[]>;
  seleccionTutor: TutorEmpresarial[]=[];
  tutorSelect: TutorEmpresarial = new TutorEmpresarial();
  anexo5:Anexo5 = new Anexo5();
  anex3:Anexo3[]=[];
  issloading = true;
  nombrEmpresa?:string;
  carrera?:string;
  responPPP?:string;
  thirtdFormGroup?: FormGroup;
  myControlAnexe8 = new FormControl();
  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private tutempresarialService: TutempresarialService,
              private activatedRoute: ActivatedRoute,
              private empresaService:EmpresaService,
              private fechaService: FechaService,
              private anexo5Service: Anexo5Service,
              private proyectoService: ProyectoService,
              private anexo3Service: Anexo3Service) { }

  ngOnInit(): void {
    // this.obtenerTutor();
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      let proy = params['pro']
      let carrera = params['carrera']
      let responsable = params['responsable']
      this.idEmpresa=id;
      this.proyecto = proy;
      this.carrera = carrera;
      this.responPPP = responsable;

      this.tutempresarialService.getTutoresAll().subscribe(value => {
        this.tutorEmpresarial=value.filter(value1 => value1.empresa_id=this.idEmpresa);
        console.log(this.tutorEmpresarial)
      });
    })
    this.primerForm = this._formBuilder.group({
      cedula:[''],
      nombres:[''],
      apellidos:[''],
      correo:[''],
      clave:[''],
      firstCtrl: ['', Validators.required],
    });

    this.segundoForm = this._formBuilder.group({
    });

    this.thirtdFormGroup = this._formBuilder.group({
    });

    this.anexo3Service.getAnexo3byProyecto(this.proyecto).subscribe(value => {
      this.anex3 = value.filter(value1 => value1.estado=='AN');
    })

    // console.log(this.tutorEmpresarial)
  }

  ObtenerDatos(){


  }

  Designar(){
    console.log("Designar");

  }

  selectionTutor(tutorselect: MatSelectionListChange){
    console.log("Seleccion Tutor")
    this.tutorSelect = tutorselect.option.value;
  }

  obtenerDatos(): Anexo5{
    this.fechaService.getSysdate().subscribe(value => {
      this.anexo5.fechaRespuesta= value.fecha;
      this.anexo5.idEmpresa= this.idEmpresa;
      this.anexo5.idProyectoPPP= this.proyecto;
      this.anexo5.carrera= this.carrera;
      this.anexo5.responsablePPP= this.responPPP;
    })
    return this.anexo5;
  }
anexo5C:Anexo5= new Anexo5();
  async asignarTutor(){
    // @ts-ignore
    var anexo5=this.obtenerDatos(this.anexo5C);

    Swal.fire({
      allowOutsideClick: false,
      allowEnterKey:false,
      allowEscapeKey:false,
      text: 'Para almacenar la respuesta descague el Anexo (A5) y subalo',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Salir',
      confirmButtonText: 'Generar Anexo',
      denyButtonText: `Enviar Respuesta`,
      denyButtonColor: "#3cb227",
      color: "#070000",
      confirmButtonColor: "#007cff",
      background: "#ffffff",
    }).then(async (result)=>{
      if(result.isConfirmed){
        // @ts-ignore
        this.generarA5(anexo5);
      } else if (result.isDenied){

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
                  anexo5.documento = docx + '';
                  this.anexo5Service.saveAnexo5(anexo5).subscribe(value1 => {
                    // var pro2=this.obtnerdatosestadoan5();
                      Swal.fire({
                        title: 'Respuesta Enviada',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                      this.router.navigate(['/panelempresa/gestionpracticasppp/TutorEmpresarial'])
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
    })

  }

  obtenerCarreraSigla(sigla:string){
    if(sigla=='TDS'){
      this.carrera='Tecnologia Superior en Desarrollo de Software';
    }if(sigla=='ADS'){
      this.carrera='Analisis y Diseño de Sistemas';
    }if(sigla=='ED'){
      this.carrera='Entrenamiento Deportivo';
    }
  }

  generarA5(){
    this.obtenerDatos();
    var a:Anexo5 = this.obtenerDatos();

    var pipe:DatePipe = new DatePipe('en-US')

    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/darwin-g/src/assets/docs/Anexo5.docx", function (
      // @ts-ignore
      error,
      // @ts-ignore
      content
    ){
      if(error){
        throw error;
      }
      const zip= new PizZip(content);
      const doc = new Docxtemplater(zip,{paragraphLoop: true, linebreaks: true});

      doc.setData({
        nombreCarrera:a.carrera,
        ResponsablePPP:a.responsablePPP,
        fecha:pipe.transform(a.fechaRespuesta, 'dd/MM/yyyy'),
        titulo:a.tituloTutor,
        tutor:"JAUN",
        cedulaTutor:"123",
        estudiante:a.listaEstudiantes,
        gerenteNombre:a.idEmpresa,
        cargo:a.idEmpresa
      });
      try{
        doc.render();
      }catch (error){
        // @ts-ignore
        function replaceErrors(key,value){
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
      saveAs(out, "Designar Tutor (A5).docx");
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
          this.anexo5.documento = "";
          Swal.fire(
            'Fallo',
            'El documento es demasiado pesado',
            'warning'
          )
        } else {
          this.anexo5.documento = docx + "";
        }
      })
    }
  }

  pryectoselectestado2: Solicitudproyecto = new Solicitudproyecto();
  obtnerdatosestadoan5():  Solicitudproyecto {
    this.pryectoselectestado2.id=this.proyecto;
    this.pryectoselectestado2.estado=false;
    return this.pryectoselectestado2;
  }

  anexo3slct:Anexo3= new Anexo3();
  listarEstudiantes(anexo3Select:MatSelectionListChange){
  }
}
