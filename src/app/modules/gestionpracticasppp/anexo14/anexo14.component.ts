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
import {ActivatedRoute} from "@angular/router";
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
  selector: 'app-anexo14',
  templateUrl: './anexo14.component.html',
  styleUrls: ['./anexo14.component.css']
})
export class Anexo14Component implements OnInit {

  activar?:boolean=false;
  sum = 0;
  numerominimo=0;

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  isexist?: boolean;
  myControl = new FormControl();
  cedula?:String;
  nombres?:String;
  fechai?:Date;
  fechaf?:Date;
  fechae?:Date;
  resultadoAnexo14?:String;
  user: User=new User();
  anexo9: Anexo9=new Anexo9();
  anexo9select: Anexo9[] = []
  anexo7: Anexo7[] = []
  anexo7select: Anexo7 = new Anexo7();
  proyectoselect: Solicitudproyecto = new Solicitudproyecto();
  filteredOptions?: Observable<Anexo7[]>;
  firstFormGroup?: FormGroup;
  secondFormGroup?:FormGroup;
  thirdFormGroup?:FormGroup;
  fourFormGroup?:FormGroup;
  numero?:Number;
  rows: FormArray;
  itemForm?: FormGroup;
  anexo9ss:Anexo9[]=[];
  tutoracaItem1?:String
  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private anexo7Service: Anexo7Service,
              private usarioService: IniciosesionService,
              private proyectoService: ProyectoService,
              private fechaService: FechaService,
              private _adapter: DateAdapter<any>,
              private anexo14Service: Anexo14Service,
              private anexo9Service:Anexo9Service,

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
      let cedula = params['cedula']
      let nombres = params['nombres']
      this.nombres = nombres;
      console.log("esta es la cedula"+this.nombres)
      this.anexo7Service.getAnexo7().subscribe(data => {
        this.anexo7 = data.filter(value => value.cedulaTutoracademico==cedula);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.issloading = false;

      })
      this.fechaService.getSysdate().subscribe(value => {
        this.fechae = value.fecha;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      anexo6: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
    });

    this.thirdFormGroup.get("items_value")?.setValue("yes");
    this.thirdFormGroup.addControl('rows', this.rows);

  }
  filter(value: any): Anexo7[] {
    const filterValue = value.toString().toLowerCase();
    return this.anexo7.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionAnexo7(anexo7: MatSelectionListChange){
    this.anexo7select=anexo7.option.value

    this.proyectoService.getSolicitudesbyid(Number(this.anexo7select.idProyectoPPP)).subscribe(dataP=>{
      this.proyectoselect=dataP
      console.log("id"+this.proyectoselect.id)
      // this.anexo9Service.getanexo9byproyecto(Number(this.anexo7select.idProyectoPPP)).subscribe(data=>{
      //   this.anexo9ss=data
      //   console.log("nombretutor"+this.nombres)
      //   this.anexo9=this.anexo9ss[0];
      //   console.log(this.anexo9.totalHoras+"horassssssssssssssssssss515")
      // })
    })
    this.anexo9Service.getAnexo9byCedula(this.anexo7select.cedulaEstudiante+'').subscribe(data=>{

      this.isexist=data.length!=0;
      if(this.isexist==true){
        this.anexo9=data[0]
      }else{
        Swal.fire({
          title: 'El estudiante no tiene aun registradas sus actividades(A9)',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }

    })




    resultado?.forEach(value2 => {
      // @ts-ignore
      this.onAddRow(value2.item+"", value2.de+"")
    })

  }
//Array
  onAddRow(tutoraca1:String,tutoraca:String) {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup(tutoraca1,tutoraca));
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.tutoracademicoPuntaje;
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
      this.sum+=element.tutoracaItem2;
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
      this.sum+=element.tutoracaItem2;
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
    console.log("metodo sumar"+this.sum)
  }
  createItemFormGroup(tutoraca1:String,tutoraca:String): FormGroup {
    return this._formBuilder.group({
      tutoracaItem0:[tutoraca1, Validators.required],
      tutoracaItem1:[tutoraca, Validators.required],
      tutoracaItem2:['', Validators.required],
    });
  }


  anexo14ob: Anexo14 = new Anexo14();
  obtenerdatos(){
    this.anexo14ob.cedulaEstudiante=this.anexo7select.cedulaEstudiante;
    this.anexo14ob.carrera=this.proyectoselect.carrera;
    this.anexo14ob.idProyecto=this.proyectoselect.id;
    this.anexo14ob.nombretutoracademico=this.nombres;
    this.anexo14ob.nombresEstudiante=this.anexo7select.nombreEstudiante;
    this.anexo14ob.tutoracademicoPuntaje=this.sum;
    this.anexo14ob.promedio=this.anexo14ob.promedio;
    this.anexo14ob.fechaInicio=this.proyectoselect.fechaInicio;
    this.anexo14ob.fechaFinaliza=this.proyectoselect.fechaFin;
    this.anexo14ob.empresa=this.anexo7select.nombreEmpresa;
    this.anexo14ob.cedulatutoracademico=this.anexo7select.cedulaTutoracademico;
    this.anexo14ob.siglascarrera=this.anexo7select.siglascarrera;
    this.anexo14ob.fechaEvaluacion=this.fechae;
    this.anexo14ob.totalHoras=parseInt(this.anexo9.totalHoras+'');
    console.log(this.anexo14ob.totalHoras+"horassssssssssssssssssss")
    this.anexo14ob.tutoraca=this.rows.getRawValue();
    return this.anexo14ob;
  }


  guardar(){
    this.anexo14ob=this.obtenerdatos();
    this.anexo14Service.saveAnexo14(this.obtenerdatos()).subscribe(datos=>{
      Swal.fire({
        title: 'Evaluacion Completada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
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


  subirDocumento14(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo14ob.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexo14ob.documento=docx+"";
        }
      })
    }
  }

  generarDocumento14() {
    var anexo14:Anexo14=this.obtenerdatos();
    console.log(anexo14)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo14.docx", function(
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
        fechainicio:pipe.transform(anexo14.fechaInicio,'dd/MM/yyyy'),
        fechafin:pipe.transform(anexo14.fechaFinaliza,'dd/MM/yyyy'),
        tb:anexo14.tutoraca,
        nombreTutoracademico:anexo14.nombretutoracademico,
        puntajeta:anexo14.tutoracademicoPuntaje,
        nombreEstudiante:anexo14.nombresEstudiante,
        cedulaEstudiante:anexo14.cedulaEstudiante,
        empresa:anexo14.empresa,
        carrera:anexo14.carrera,
        nhoras:anexo14.totalHoras,


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
      saveAs(out, "Anexo14.docx");
    });
  }
  refresh() {
    window.location.reload();
  }
}
