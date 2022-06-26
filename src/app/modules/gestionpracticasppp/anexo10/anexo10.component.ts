import { Component, OnInit } from '@angular/core';
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {Anexo7} from "../../../models/anexo7";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo10} from "../../../models/anexo10";
import {FechaService} from "../../../services/fecha.service";
import {Anexo7Service} from "../../../services/anexo7.service";
import {ActivatedRoute} from "@angular/router";
import {Anexo10Service} from "../../../services/anexo10.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {MatSelectionListChange} from "@angular/material/list";
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
@Component({
  selector: 'app-anexo10',
  templateUrl: './anexo10.component.html',
  styleUrls: ['./anexo10.component.css']
})
export class Anexo10Component implements OnInit {

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  isexist?: boolean;
  actualzar=false
//Variables
  cedula?: String;
  nombre?: String;
  ceduladir?: String;
  nombredir?: String;
  Fechaenvio?: Date;
//ArrayActividadesEstudiante
  rows: FormArray;
  itemForm?: FormGroup;
//secuenciasdepantallas
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;
//anexo10
  anexo10: Anexo10[] = []
  anexo10es: Anexo10 = new Anexo10();
//anexo7
  anexo7: Anexo7[] = []
  anexo7select: Anexo7 = new Anexo7();
//filtros
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo7[]>;
id?:Number;
  constructor(private fechaService: FechaService, private anexo7Service: Anexo7Service, private activatedRoute: ActivatedRoute,
              private anexo10Service: Anexo10Service, private proyectoService: ProyectoService,
              private _formBuilder: FormBuilder) {

    this.secondFormGroup = this._formBuilder.group({
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
    // this.obtnerdatos();
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
      this.cedula=cedula;
      this.id = id;
      console.log(cedula+"id es:"+id)

      this.anexo7Service.getAnexo7().subscribe(data => {
        this.proyectoService.getSolicitudes().subscribe(value => {
          value.forEach(value1 => {
            data.filter(value => value.cedulaTutoracademico==this.cedula).forEach(value2 => {
              if(value1.estado==true&&value2.idProyectoPPP==value1.id){
                this.anexo7.push(value2)
                this.filteredOptions = this.myControl.valueChanges.pipe(
                  startWith(''),
                  map(values => this.filter(values)),
                );
              }
              this.issloading = false;
            })
          })
        })
        console.log(data);

      })



      this.fechaService.getSysdate().subscribe(value => {
        this.Fechaenvio = value.fecha;
      })
    })
    this.firstFormGroup = this._formBuilder.group({
      anexo10: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
    //ArrayActividades
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);
  }

  filter(value: any): Anexo7[] {
    const filterValue = value.toString().toLowerCase();
    return this.anexo7.filter(option => option.nombreEmpresa?.toLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }
  selectionAnexo7(anexo7: MatSelectionListChange){
    this.anexo7select=anexo7.option.value
    console.log(this.anexo7select.cedulaEstudiante)

    this.anexo7select.cronogramaActividadesAnexo7s?.forEach(value1 => {
      this.onAddRow(value1.actividadRealizar+"")
    })
  }
  refresh(){
    window.location.reload();
  }
  onAddRow(actividad:String) {
    this.rows.push(this.createItemFormGroup(actividad));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }
  numero?:Number;

  createItemFormGroup(actividades:String): FormGroup {
    return this._formBuilder.group({
      fechaSeguimiento: ['', Validators.required],
      actividades:[actividades, Validators.required],
      fechaFinPrevista: ['', Validators.required],
      porcentajeAvance: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }


  anexoss10: Anexo10 = new Anexo10();
  obtnerdatos(){
    this.anexoss10.idProyectoPPP = this.anexo7select.idProyectoPPP;
    this.anexoss10.carrera=this.anexo7select.carrera;
    this.anexoss10.siglascarrera=this.anexo7select.siglascarrera;
    this.anexoss10.nombreEmpresa=this.anexo7select.nombreEmpresa;
    this.anexoss10.cedulaTutorAcademico =this.anexo7select.cedulaTutoracademico;
    this.anexoss10.tutorAcademico = this.anexo7select.nombreTutoracademico;
    this.anexoss10.num_proceso=this.anexo7select.id;
    this.anexoss10.nombreEstudiante=this.anexo7select.nombreEstudiante;
    this.anexoss10.cronogramaAnexo10s = this.rows.getRawValue();
    return this.anexoss10;
  }


//////////////GUARDAR///////////////
  guardaranexo10(){
    var anexo10=this.obtnerdatos();
    this.anexo10Service.saveAnexo10(anexo10).subscribe(value => {
      Swal.fire({
        title: 'Seguimiento guardado.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    },error => {
      Swal.fire({
        title: 'Ya existe un seguimiento para este Estudiante',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

      this.issloading=false;
      window.location.reload();
    })
  }

  subirDocumento10(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexoss10.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexoss10.documento=docx+"";
        }
      })
    }
  }

  generarDocumento10() {
    var anexo10:Anexo10=this.obtnerdatos();
    console.log(anexo10)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo10.docx", function(
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
        carrera:anexo10.carrera,
        nombreEstudiante:anexo10.nombreEstudiante,
        nombreEmpresa:anexo10.nombreEmpresa,
        tutorAcademico:anexo10.tutorAcademico,
        tb1:anexo10.cronogramaAnexo10s,
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
      saveAs(out, "Anexo10.docx");
    });
  }
}
