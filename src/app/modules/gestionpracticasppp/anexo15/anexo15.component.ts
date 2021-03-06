import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {Anexo14} from "../../../models/anexo14";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo12} from "../../../models/anexo12";
import Swal from "sweetalert2";
import {Anexo14Service} from "../../../services/anexo14.service";
import {Anexo12Service} from "../../../services/anexo12.service";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo6Service} from "../../../services/anexo6.service";
import {Anexo6} from "../../../models/anexo6";
import {Anexo15} from "../../../models/anexo15";
import {Anexo15Service} from "../../../services/anexo15.service";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";

// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Resposable} from "../../../models/resposableppp";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Anexo7} from "../../../models/anexo7";
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
  selector: 'app-anexo15',
  templateUrl: './anexo15.component.html',
  styleUrls: ['./anexo15.component.css']
})
export class Anexo15Component implements OnInit {

  activar?: boolean = false;
  sum = 0;
  numerominimo = 0;

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  isexist?: boolean;
  myControl = new FormControl();
  cedula?: String;
  idpro?: Number;
  fechai?: Date;
  fechaf?: Date;
  fechae?: Date;
  resultadoAnexo14?: String;
  user: User = new User();

  anexo14: Anexo14[] = []
  anexo14select: Anexo14 = new Anexo14();
  filteredOptions?: Observable<Anexo14[]>;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  proyectoselect: Solicitudproyecto = new Solicitudproyecto();
  numero?: Number;
  anexo12: Anexo12 = new Anexo12();
  tutoracaItem1?: String;
  anexo6: Anexo6[] = [];
  responsableppp:Resposable[]=[];
responsable:Resposable=new Resposable();
  anexo7: Anexo7 = new Anexo7();
  nombre?: String;
  anexo7lista: Anexo7[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private anexo14Service: Anexo14Service,
              private fechaService: FechaService,
              private _adapter: DateAdapter<any>,
              private anexo6Service: Anexo6Service,private anexo7Service:Anexo7Service,
              private anexo12Service: Anexo12Service, private anexo15Service: Anexo15Service,
              private solicitudService: ProyectoService, private router: Router,private responsablepppService:ResponsablepppService
  ) {
    this._adapter.setLocale('es-ec');

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      let cedula = params['cedula']
      let nombres = params['nombres']

      this.nombre = nombres;
      this.cedula = cedula;

      console.log("este es el nomnre" + this.nombre)
      console.log("este es la cedula" + this.cedula)

      this.anexo14Service.getAll().subscribe(data => {
        this.anexo14 = data.filter(v => v.cedulatutoracademico == this.cedula)
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.issloading = false;
        console.log(this.filteredOptions + "ccccccccccccc")

      })

      this.fechaService.getSysdate().subscribe(value => {
        this.fechae = value.fecha;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      anexo15:['',Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});

  }

  filter(value: any): Anexo14[] {
    const filterValue = value.toString().toLowerCase();
    return this.anexo14.filter(option => option.empresa?.toLowerCase().includes(filterValue)
      || option.nombresEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionAnexo14(anexo14: MatSelectionListChange) {
    this.anexo14select = anexo14.option.value

    this.anexo12Service.getAnexo12bycedulaest(this.anexo14select.cedulaEstudiante + '').subscribe(value => {
      this.anexo12 = value;
      console.log("obtuve datos del anexo12")
    })
    this.anexo7Service.getAnexo7().subscribe(value1 => {
      this.anexo7lista = value1.filter(value2=>value2.nombreEstudiante==this.anexo14select.nombresEstudiante)
      // @ts-ignore
      this.anexo7=value1[0];
      console.log("resaponsable"+this.anexo7.nombreResponsable)
    })

  }


  anexo15: Anexo15 = new Anexo15();

  promedio?: Number;

  obtenerdatos() {
    this.anexo15.carrera = this.anexo14select.carrera;
    this.anexo15.idProyecto = this.anexo14select.idProyecto;
    this.anexo15.periodoacademico=this.anexo7.nombreResponsable;
    ///estudiante
    this.anexo15.cedulaEstudiante = this.anexo14select.cedulaEstudiante;
    this.anexo15.nombresEstudiante = this.anexo14select.nombresEstudiante;
    //tutoracademico
    this.anexo15.nombretutoracademico = this.anexo14select.nombretutoracademico;
    this.anexo15.cedulatutoracademico = this.anexo14select.cedulatutoracademico;

    //tutorempresarial
    this.anexo15.nombretutoremp = this.anexo12.nombretutoremp;
    this.anexo15.cedulatutoremp = this.anexo12.cedulatutoremp;


    //notas
    this.anexo15.notaTutorA = this.anexo14select.tutoracademicoPuntaje;
    this.anexo15.notaTutorE = this.anexo12.tutorempPuntaje;

    //porcentajes
    // @ts-ignore
    this.anexo15.porcentajeTutorA = (this.anexo14select.tutoracademicoPuntaje * 40) / 100;
    // @ts-ignore
    this.anexo15.porcentajeTutorE = (this.anexo15.notaTutorE* 60) / 100;
    // @ts-ignore
    this.promedio = (this.anexo15.porcentajeTutorA + this.anexo15.porcentajeTutorE);
    console.log("promedio" + this.promedio)
    this.anexo15.empresa = this.anexo14select.empresa;
    this.anexo15.siglascarrera = this.anexo14select.siglascarrera;
    this.anexo15.fechaEvaluacion = this.fechae;
this.anexo15.ciclo=this.anexo7.ciclo;
    this.anexo15.promediofinal = this.promedio;
    this.anexo15.totalHoras = this.anexo14select.totalHoras;
    console.log(this.anexo15.totalHoras)
    return this.anexo15;
  }


  guardar() {
    this.anexo15 = this.obtenerdatos();
    this.anexo15Service.saveAnexo15(this.obtenerdatos()).subscribe(datos => {
      Swal.fire({
        title: 'Informe final completo',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading = false;
      this.router.navigate(['/panelusuario/gestionpracticasppp/anexo15listar',this.cedula,this.nombre]);

    }, err => {
      Swal.fire({
        title: 'no completado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
      this.issloading = false;
    })


  }


  subirDocumento15(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo15.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo15.documento=docx+"";
        }
      })
    }
  }

  generarDocumento15() {
    var anexo15:Anexo15=this.obtenerdatos();
    console.log(anexo15)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo15.docx", function(
      // @ts-ignore
      error,
      // @ts-ignore
      // @ts-ignore
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });


      doc.setData({
        fecha:pipe.transform(anexo15.fechaEvaluacion,'dd/MM/yyyy'),
        nombreTutoracademico:anexo15.nombretutoracademico,
        notaa:anexo15.notaTutorA,
        notae:anexo15.notaTutorE,
        notafa:anexo15.porcentajeTutorA,
        notafe:anexo15.porcentajeTutorE,
        promedio:anexo15.promediofinal,
        nombreEstudiante:anexo15.nombresEstudiante,
        cedulaEstudiante:anexo15.cedulaEstudiante,
        empresa:anexo15.empresa,
        ciclo:anexo15.ciclo,
        carrera:anexo15.carrera,
        totalhoras:anexo15.totalHoras,
        responsablePPP:anexo15.periodoacademico,

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
      saveAs(out, "Anexo15.docx");
    });
  }
  refresh() {
    window.location.reload();
  }

}
