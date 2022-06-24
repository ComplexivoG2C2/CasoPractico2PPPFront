import { Component, OnInit } from '@angular/core';


// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {Anexo8} from "../../../models/anexo8";
import {Anexo7} from "../../../models/anexo7";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Anexo6Service} from "../../../services/anexo6.service";
import {IniciosesionService} from "../../../services/iniciosesion.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {FechaService} from "../../../services/fecha.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo14Service} from "../../../services/anexo14.service";
import {Anexo9Service} from "../../../services/anexo9.service";
import {Anexo9} from "../../../models/anexo9";
import {Anexo7Service} from "../../../services/anexo7.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo14} from "../../../models/anexo14";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
import {Anexo14empService} from "../../../services/anexo14emp.service";
import {FechatutorempService} from "../../../services/fechatutoremp.service";
import {ProyectotutorempService} from "../../../services/proyectotutoremp.service";
import {Anexo12} from "../../../models/anexo12";
import {Anexo12empService} from "../../../services/anexo12emp.service";

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

const resultado = [
  {item:'a.',de:'Asistencia y Puntualidad'},
  {item:'b.',de:'Cumplimiento de normas establecidas  por la entidad rectora '},
  {item:'c.',de:'Compromiso y responsabilidad frente al trabajo'},
  {item:'d.',de:'Integración y actitud de colaboración con los miembros del equipo de la empresa '},
  {item:'e.',de:' Valorización de los resultados tomados como base de las actividades encomendadas al estudiante, así como su cumplimiento en los plazos establecidos '}
]

@Component({
  selector: 'app-anexo12',
  templateUrl: './anexo12.component.html',
  styleUrls: ['./anexo12.component.css']
})
export class Anexo12Component implements OnInit {


  activar?:boolean=false;
  sum = 0;
  numerominimo=0;

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  isexist?: boolean;
  myControl = new FormControl();
  cedula?:String;
  idpro?:Number;
  fechai?:Date;
  fechaf?:Date;
  fechae?:Date;
  resultadoAnexo14?:String;
  user: User=new User();

  anexo14: Anexo14[] = []
  anexo14select: Anexo14 = new Anexo14();
  proyectoselect: Solicitudproyecto = new Solicitudproyecto();
  filteredOptions?: Observable<Anexo14[]>;
  firstFormGroup?: FormGroup;
  secondFormGroup?:FormGroup;
  thirdFormGroup?:FormGroup;
  fourFormGroup?:FormGroup;
  numero?:Number;
  rows: FormArray;
  itemForm?: FormGroup;
  tutoracaItem1?:String;
nombre?:String;
  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private anexo14empService: Anexo14empService,
              private fechatutorempService: FechatutorempService,
              private _adapter: DateAdapter<any>,
              private anexo12tutorempService:Anexo12empService,
              private solicitudemptutorService:ProyectotutorempService,private router: Router,
  ) {
    this._adapter.setLocale('es-ec');
    this.thirdFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      let idpro = params['idpro']
      let nombre = params['nombre']
      let cedula = params['cedula']
      this.idpro= idpro;
      this.nombre=nombre;
      this.cedula=cedula;

      console.log("este es el id de proyecto"+this.idpro)

      console.log("este es el id de nn"+this.nombre)

      console.log("este es el id de cc"+this.cedula)

      this.anexo14empService.getAll().subscribe(data => {
        this.anexo14 = data.filter(value => value.idProyecto==this.idpro);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.issloading = false;
        console.log(this.filteredOptions+"ccccccccccccc")

      })
      this.fechatutorempService.getSysdate().subscribe(value => {
        this.fechae = value.fecha;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      anexo12: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
    });

    this.thirdFormGroup.get("items_value")?.setValue("yes");
    this.thirdFormGroup.addControl('rows', this.rows);

  }
  filter(value: any): Anexo14[] {
    const filterValue = value.toString().toLowerCase();
    return this.anexo14.filter(option => option.empresa?.toLowerCase().includes(filterValue)
      ||option.nombresEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionAnexo14(anexo14: MatSelectionListChange){
    this.anexo14select=anexo14.option.value

    this.solicitudemptutorService.getSolicitudesbyid(Number(this.anexo14select.idProyecto)).subscribe(dataP=>{
      this.proyectoselect=dataP
    })

    resultado?.forEach(value2 => {
      // @ts-ignore
      this.onAddRow(value2.item+"", value2.de+"")
    })


  }
//Array
  onAddRow(tutoremp1:String,tutoremp:String) {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup(tutoremp1,tutoremp));
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.tutorempPuntaje;
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  onRemoveRow(rowIndex:number){
    this.sum = 0;
    this.rows.removeAt(rowIndex);
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.tutorempItem2;
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  sumar(){
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.tutorempItem2;
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
    console.log("metodo sumar"+this.sum)
  }
  createItemFormGroup(tutoremp1:String,tutoremp:String): FormGroup {
    return this._formBuilder.group({
      tutorempItem0:[tutoremp1, Validators.required],
      tutorempItem1:[tutoremp, Validators.required],
      tutorempItem2:['', Validators.required],
    });
  }


  anexo12ob: Anexo12= new Anexo12();
  obtenerdatos(){
    this.anexo12ob.cedulaEstudiante=this.anexo14select.cedulaEstudiante;
    this.anexo12ob.carrera=this.proyectoselect.carrera;
    this.anexo12ob.idProyecto=this.proyectoselect.id;
    this.anexo12ob.nombretutoremp=this.nombre;
    this.anexo12ob.nombresEstudiante=this.anexo14select.nombresEstudiante;
    this.anexo12ob.tutorempPuntaje=this.sum;
    this.anexo12ob.promedio=this.anexo12ob.promedio;
    this.anexo12ob.fechaInicio=this.proyectoselect.fechaInicio;
    this.anexo12ob.fechaFinaliza=this.proyectoselect.fechaFin;
    this.anexo12ob.empresa=this.anexo14select.empresa;
    this.anexo12ob.cedulatutoremp=this.cedula;
    this.anexo12ob.siglascarrera=this.anexo14select.siglascarrera;
    this.anexo12ob.fechaEvaluacion=this.fechae;
    this.anexo12ob.totalHoras=this.anexo14select.totalHoras;
    console.log(this.anexo12ob.totalHoras)
    this.anexo12ob.tutoremp=this.rows.getRawValue();
    return this.anexo12ob;
  }


  guardar(){
    this.anexo12ob=this.obtenerdatos();
    this.anexo12tutorempService.saveAnexo12(this.obtenerdatos()).subscribe(datos=>{
      Swal.fire({
        title: 'Evaluacion Completada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading=false;
      this.router.navigate(['/paneltutor/gestionpracticasppp/anexo121',this.anexo14select.idProyecto,this.nombre]);

    },err=>{
      Swal.fire({
        title: 'no registrado',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
      this.issloading=false;
    })





  }


  subirDocumento12(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo12ob.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo12ob.documento=docx+"";
        }
      })
    }
  }

  generarDocumento12() {
    var anexo12:Anexo12=this.obtenerdatos();
    console.log(anexo12)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo12.docx", function(
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
        fechainicio:pipe.transform(anexo12.fechaInicio,'dd/MM/yyyy'),
        fechafin:pipe.transform(anexo12.fechaFinaliza,'dd/MM/yyyy'),
        tb:anexo12.tutoremp,
        nombreTutoremp:anexo12.nombretutoremp,
        puntajete:anexo12.tutorempPuntaje,
        nombreEstudiante:anexo12.nombresEstudiante,
        cedulaEstudiante:anexo12.cedulaEstudiante,
        empresa:anexo12.empresa,
        carrera:anexo12.carrera,
        nhoras:anexo12.totalHoras,

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
      saveAs(out, "Anexo12.docx");
    });
  }
  refresh() {
    window.location.reload();
  }
}
