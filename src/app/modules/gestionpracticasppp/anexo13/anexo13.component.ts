import { Component, OnInit } from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Solicitudproyecto, TutorAcademicoResponse} from "../../../models/solicitudproyecto";
import {Anexo8} from "../../../models/anexo8";
import {Anexo13} from "../../../models/anexo13";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo8Service} from "../../../services/anexo8.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Anexo13Service} from "../../../services/anexo13.service";
import {MatSelectionListChange} from "@angular/material/list";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import { DatePipe } from '@angular/common';
import Docxtemplater from "docxtemplater";
import Swal from "sweetalert2";
import {Anexo3Service} from "../../../services/anexo3.service";
import {MatSelectChange} from "@angular/material/select";
import {ActividadesAnexo9Request, Anexo9} from "../../../models/anexo9";
import {ProyectotutorempService} from "../../../services/proyectotutoremp.service";
import {TutempresarialService} from "../../../services/tutempresarial.service";
import {TutoracademicoService} from "../../../services/tutoracademico.service";
import {TutorEmpresarial} from "../../../models/tutorEmpresarial";
import {TutorempuserService} from "../../../services/tutorempuser.service";
import {EmpresaService} from "../../../services/empresa.service";
import {Anexo9Service} from "../../../services/anexo9.service";
import {Empresa} from "../../../models/empresa";
import {Anexo7Service} from "../../../services/anexo7.service";
import {Anexo7} from "../../../models/anexo7";
import {Anexo10Service} from "../../../services/anexo10.service";
import {Anexo10} from "../../../models/anexo10";
import {Anexo6Service} from "../../../services/anexo6.service";
import {Anexo6} from "../../../models/anexo6";

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

  isexist?: boolean;
  issloading = true;
  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirthFormGroup?: FormGroup;
  tirFormGroup?: FormGroup;
  myControl = new FormControl();
  solicitudproyectos: Solicitudproyecto[]=[];
  pryectoselect: Solicitudproyecto = new Solicitudproyecto();
  carrera?:string;
  filteredOptions?: Observable<Anexo8[]>;
  proyecto?: Anexo8[]=[];
  proyecto13?:Solicitudproyecto = new Solicitudproyecto();
  cedula?:string;
  anexo13:Anexo13 = new Anexo13();
  anexo13guardar:Anexo13 = new Anexo13();
  tutoremp:TutorEmpresarial=new TutorEmpresarial();
  ttemp:TutorEmpresarial[]=[];
  empresa:Empresa=new Empresa();
  emp:Empresa[]=[];
  solicitudes:Solicitudproyecto[]=[];
anexo9:Anexo9=new Anexo9();
  anexo9s:Anexo9[]=[];
  anexo6:Anexo6=new Anexo6();
  anexo6s:Anexo6[]=[];
  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private proyectoService: ProyectoService,
              private anexo8Service: Anexo8Service,
              private activatedRoute: ActivatedRoute,
              private anexo13Service: Anexo13Service,private anexo3Service:Anexo3Service,private tutorempService:TutorempuserService,
              private tutoracademicoService:TutoracademicoService,private anexo9Service:Anexo9Service,
              private anexo6Service:Anexo6Service,private empresaService:EmpresaService
  ) { }
  nombre?:string;
  email?:String;
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      let cedula = params['cedula']
      let nombres = params['nombres']
      let email=params['email']
      this.nombre=nombres;
      this.cedula=cedula;
      this.email=email;

      this.anexo3Service.getanexo3(cedula).subscribe(datos=>{
        this.proyectoService.getSolicitudes().forEach(value => {
          this.solicitudproyectos=value.filter(value1 => value1.id==datos.filter(d=>d.estado=="AN")[datos.length-1].idProyectoPPP&&value1.estado==true)
        })
        this.issloading=false;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      tl:new FormControl(),
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
    this.tirFormGroup = this._formBuilder.group({
     dd: ['', Validators.required],
    });

  }

idpro?:Number;

  selectOpcion(event: MatSelectChange){
    this.proyectoService.getSolicitudesbyid(event.value).subscribe(data=>{
      this.proyecto13=data
      this.idpro=this.proyecto13.id;


      console.log( this.idpro+"fffffffffffffffffffffffffffff")
      this.tutorempService.gettutorbyproyecto(this.idpro).subscribe(value => {
        // @ts-ignore
        this.ttemp=value.filter(value1 => value1.nombres ==this.proyecto13.nombreTutoremp)
        this.tutoremp=this.ttemp[0];
        // console.log('nombre tutor'+this.tutoremp.nombres)
        console.log('id tutor'+this.tutoremp.id)
        // this.anexo9Service.getEmpresaById(data.empresa).subscribe(da=>{
        //   this.empresa=da;
        //   console.log("empresa"+this.empresa)
        // })

        this.empresaService.getEmpresaAll().subscribe(da=>{
          this.emp=da.filter(va=>va.id==this.tutoremp.empresa_id)
          this.empresa=this.emp[0];
          console.log("empresa"+this.empresa.ciudad)


        // @ts-ignore
        // this.anexo9Service.getanexo9byproyecto(Number(this.proyecto13.id)).subscribe(value9=>{
        //   this.anexo9s=value9;
        //   this.anexo9=this.anexo9s[0];

          this.anexo9Service.getanexo9byproyecto(Number(this.proyecto13.id)).subscribe(value9=>{
            this.anexo9s=value9.filter(v=>v.cedulaEstudiante==this.cedula);

            this.isexist=value9.length!=0;
            if(this.isexist==true){
              this.anexo9=this.anexo9s[0];
              console.log(this.anexo9.nombreTutorAcademico+'ddddddddd')
            }else{
              Swal.fire({
                title: 'Para realizar el informe final debe completar el Anexo(9)',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }





          // @ts-ignore
    //       this.anexo6Service.getAnexo6byId(this.proyecto13.id).subscribe(value7=>{
    //
    //         this.anexo6=value7
    //         this.anexo13.cedulaTutorAcademico=this.anexo6.cedulaDocenteApoyo
    //
    //         console.log(this.anexo6+"cedulatutoracademico")
    //       })
    //       })
    //     })
    //     })
    // })

          this.anexo6Service.getAnexo6All().subscribe(value7=>{

            this.anexo6s=value7.filter(v2=>v2.nombreDocenteReceptor==this.anexo9.nombreTutorAcademico)
            this.anexo6=this.anexo6s[0]
            this.anexo13.cedulaTutorAcademico=this.anexo6.cedulaDocenteApoyo
            console.log(this.anexo6+"cedulatutoracademico")
          })
        })
        })
      })
    })




      // })

    // })

  }

correoo?:String;
  obtenerDatosguardar(){

    // @ts-ignore
    this.anexo13guardar.idProyectoPPP=this.proyecto13.id;
    // @ts-ignore
    this.anexo13guardar.idEmpresa=this.proyecto13.empresa;
    this.anexo13guardar.idTutorEmp=this.tutoremp.id;
    // @ts-ignore
    this.anexo13guardar.fechaEmision=this.proyecto13.fechaat;
    return this.anexo13guardar;
  }

  obtenerDatos():Anexo13{
    // @ts-ignore
    this.anexo13.idProyectoPPP=this.proyecto13.id;
    // @ts-ignore
    this.anexo13.idEmpresa=this.proyecto13.empresa;
    this.anexo13.idTutorEmp=this.tutoremp.id;
    // @ts-ignore
    this.anexo13.fechaEmision=this.proyecto13.fechaat;
    this.anexo13.cedulaEstudiante=this.cedula;
    this.anexo13.nombreEstudiante=this.nombre;
    this.anexo13.emailEstudiante=this.email;
    // @ts-ignore
    this.anexo13.cedulaTutorEmpresarial=this.proyecto13.cedulaTutoremp;

    // @ts-ignore
    this.anexo13.nombreEmpresa= this.proyecto13.nombre;
    // @ts-ignore
    this.anexo13.nombreTutorEmpresarial= this.proyecto13.nombreTutoremp;
    // @ts-ignore
    this.anexo13.fechaInicio=this.proyecto13.fechaInicio;
    // @ts-ignore
    this.anexo13.fechaFin=this.proyecto13.fechaFin;
    // @ts-ignore
    this.anexo13.emailTutorEmpresarial=this.tutoremp.correo;
    // @ts-ignore
    this.anexo13.cargoTutorEmpresarial=this.proyecto13.tituloTutoremp;
    this.anexo13.ubicacionEmpresa=this.empresa.ciudad;
    this.anexo13.teléfonoTutorEmpresarial=this.empresa.telefonoEmpresa;

    this.anexo13.horas=this.anexo9.totalHoras+"";
    this.anexo13.nombreTutorAcademico=this.anexo9.nombreTutorAcademico;
    // this.anexo13.cedulaTutorAcademico=this.anexo6.cedulaDocenteApoyo;

    this.correoo=(this.anexo13.nombreTutorAcademico)?.toLowerCase()+'@tecazuay.edu.ec'
    this.anexo13.emailTutorAcademico=this.correoo.split(" ").join(".");
    console.log("correroo"+this.anexo13.emailTutorAcademico)
    console.log(this.anexo13)


    return this.anexo13;

  }

  generarDocumento() {
    var anexo:Anexo13=this.obtenerDatos();
    // console.log(anexo)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo13.docx", function(
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
        visionEmpresa:anexo.visionEmpresa,
        descripciondetallada:anexo.descripciondetallada,

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

  subirDocumento( file: FileList) {
    // @ts-ignore
    this.obtenerDatos();
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

  guardarAnexo13(){
    this.anexo13=this.obtenerDatos();
    this.anexo13Service.saveAnexo13(this.obtenerDatos()).subscribe(datos=>{
      // console.log(">."+this.anexo8Service.saveAnexo8(this.ontnerDatos()))
      Swal.fire({
        title: 'Informe Final subido',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading=false
      this.router.navigate(['/panelusuario/gestionpracticasppp/bienvenida']);
    },err=>{
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
