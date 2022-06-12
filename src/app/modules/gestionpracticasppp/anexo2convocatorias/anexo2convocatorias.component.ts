import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {map, Observable, startWith} from "rxjs";
import Swal from "sweetalert2";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {actividadeslistProyectos, requisitoslistProyectos, Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Actividadesanexo, Anexo2} from "../../../models/anexo2";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {MatSelectionListChange} from "@angular/material/list";

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
  selector: 'app-anexo2convocatorias',
  templateUrl: './anexo2convocatorias.component.html',
  styleUrls: ['./anexo2convocatorias.component.css']
})
export class Anexo2convocatoriasComponent implements OnInit {


  isexist?:boolean;
  isLinear = true;
  myControlconvocatoria = new FormControl();
  filteredOptionsconvocatoria?: Observable<Solicitudproyecto[]>;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirdFormGroup?: FormGroup;
  solicitudes:Solicitudproyecto[]=[];
  solicitudproyectoselect:Solicitudproyecto = new Solicitudproyecto();
  actividadesanexo:Actividadesanexo[]=[]
  anexo2:Anexo2=new Anexo2();
  numeroConvocatoria?:String;
  data:Date = new Date();
  iddesolicitud?:Number;


  /////Agregar Actividades y requisitos
  panelOpenState = true;
  issloading=true;
  //ArrayActividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;
  materias:Materias[]=[];
  proyecto:Solicitudproyecto = new Solicitudproyecto();
  seleccionmaterias:Materias[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Materias[]>;
  cedula?:String;

  constructor(private router: Router,private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private empresaService:EmpresaService,
              private proyectoService:ProyectoService,
              private materiasService:MateriasService,private anexo2Service:Anexo2Service) {
    //ArrayActividades
    this.addForm = this._formBuilder.group({

    });
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  ngOnInit(): void {
    //ArrayActividades
    this.addForm.get("items_value")?.setValue("");
    this.addForm.addControl('rows', this.rows);

    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      let cedula = params['cedula']
      this.cedula = cedula;

      ////convocatoria
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          console.log("solicitudes"+value1)
          this.isexist=value1.filter(value2 => value2.codigocarrera==value.filter(value3 => value3.cedula==cedula)[0]).length==0;
          this.solicitudes=value1.filter(value2 => value2.codigocarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera&&value2.estado==false)
          this.anexo2Service.getAnexo2().subscribe(anexo2=>{

            if(anexo2.filter(fil=>fil.siglasCarrera==this.solicitudes[0].codigocarrera).length==0){
              console.log("codigocarera"+anexo2)
              this.numeroConvocatoria="1";
            }else{
              // @ts-ignore
              this.numeroConvocatoria=(Number(anexo2.filter(fil=>fil.siglasCarrera==this.solicitudes[0].codigocarrera).pop().numeroConvocatoria)+1).toString();
            }
            console.log("codigocarera"+anexo2)
          })
          this.issloading=false;
          this.filteredOptionsconvocatoria = this.myControlconvocatoria.valueChanges.pipe(
            startWith(''),
            map(values=>this.filtersolicitudes(values)),
          );
        })
      })


    })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      ciclo:['',Validators.required],
      fecharesepcion:['',Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });
  }

  ///filtros de materias
  filter(value: any): Materias[] {
    const filterValue = value.toString().toLowerCase();
    return this.materias.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.codigo?.toLocaleLowerCase().includes(filterValue)
    );
  }

//filtros  de las solicitudes de las empresas

  filtersolicitudes(value: any): Solicitudproyecto[] {
    const filterValue = value.toLowerCase();
    return this.solicitudes.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombre?.toLocaleLowerCase().includes(filterValue)
      ||option.nombretutoremp?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }

  //event para la selecion de la solicitud
  selectionProyecto(proyectoselect: MatSelectionListChange){
    this.solicitudproyectoselect=proyectoselect.option.value

    this.proyectoService.getSolicitudesbyid(Number(this.solicitudproyectoselect.id)).subscribe(value => {
      console.log( Number(this.solicitudproyectoselect.id)+"CODIGOOOOOO SOLICITUD")
      this.proyecto=value;
      if( value.actividadeslistProyectos?.length==0){
        this.onAddRow("");
      }
      value.actividadeslistProyectos?.forEach(value1 => {
        this.onAddRow(value1.descripcion+"")
      })
      this.materiasService.getMateriasbyCodCarrera(value.codigocarrera).subscribe(value1 => {
        this.materias = value1;
        value.requisitoslistProyectos?.forEach(value3 => {
          value1.forEach(value2 => {
            // @ts-ignore
            if(value2.nombre==value3.descripcion){
              this.seleccionmaterias.push(value2)
            }
          })
        })
        this.issloading=false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
      })
    })
  }









  //ArrayActividades
  onAddRow(descripcion:String) {
    this.rows.push(this.createItemFormGroup(descripcion));
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(descripcion:String): FormGroup {
    return this._formBuilder.group({
      descripcion:[descripcion, Validators.required],
    });
  }

  addMaterias(materias:Materias){
    console.log(materias)
    if(this.seleccionmaterias.filter(value => value.codigo==materias.codigo).length==0){
      this.seleccionmaterias.push(materias);
    }
  }
  removeMaterias(materias:Materias){
    this.seleccionmaterias.forEach((element,index)=>{
      if(element.codigo==materias.codigo) this.seleccionmaterias.splice(index,1);
    });
  }


///Setear actividades de la solicitud y agregar mas a la solicitud
  actividadeslistProyecto:actividadeslistProyectos[]=[];
  agregarActividades(proyecto:Solicitudproyecto){
    this.actividadeslistProyecto=this.rows.getRawValue();
    this.proyectoService.updateActividadesbyIdSolicitudes(Number(proyecto.id),this.actividadeslistProyecto).subscribe( value=>{
      Swal.fire({
        title: 'Actividades Agregadas',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }, error => {
      Swal.fire({
        title: 'No se pudo agregar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    });
  }

///agregar materias que se tien que tener aprovado para poder postular
requisitoslistProyectos:requisitoslistProyectos[]=[];
  agregarMaterias(proyecto:Solicitudproyecto){
    this.seleccionmaterias.forEach(value1 => {
      this.requisitoslistProyectos.push({
        descripcion:value1.nombre+""
      })
    })
    console.log(proyecto.id,this.requisitoslistProyectos)
    this.proyectoService.updateRequistosbyIdSolicitudes(Number(proyecto.id),this.requisitoslistProyectos).subscribe( value=>{
      Swal.fire({
        title: 'Requisitos (Materias Aprovadas) agregados',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }, error => {
      Swal.fire({
        title: 'No se pudo agregar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    });
  }







  obtnerDatosanexo2(proyecto:Solicitudproyecto):Anexo2 {
    this.actividadesanexo.length=0;

    this.anexo2.numeroConvocatoria =this.numeroConvocatoria;
    this.anexo2.siglasCarrera=proyecto.codigocarrera;
    this.anexo2.carrera = proyecto.carrera;
    this.anexo2.num_proceso=1;
    this.anexo2.nombreProyecto = proyecto.nombre;
    this.anexo2.nombreResponsable = proyecto.nombreresponsable;
    this.anexo2.idProyectoPPP = proyecto.id;
    this.anexo2.actividades=this.proyecto.actividadeslistProyectos;
    this.fechaService.getSysdate().subscribe(value => {
      this.anexo2.anio = this.data.getFullYear()+""
      this.anexo2.fecha = value.fecha;
    })
    this.empresaService.getEmpresaAll().subscribe(value => {
      this.anexo2.empresa=value.filter(value1 => value1.id=proyecto.empresa)[0].nombre
    })
    return this.anexo2
    console.log("datos"+this.anexo2)
  }

  subirDocumento(proyecto:Solicitudproyecto,file:FileList){
    this.obtnerDatosanexo2(proyecto);
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo2.documento="";
          Swal.fire(
            'Error',
            'El documento es demasiado pesado',
            'warning'
          )
        }else{
          this.anexo2.documento=docx+"";
        }
      })
    }
  }

  guardarAnexo2(proyeco:Solicitudproyecto){
    this.issloading=true;
    this.anexo2Service.saveAnexo2(this.obtnerDatosanexo2(proyeco)).subscribe(value => {
      Swal.fire({
        title: 'Convocatoria enviada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.issloading=false;
      this.router.navigate(['/panelusuario/gestionpracticasppp/verconvocatorias',this.cedula]);
    },error => {
      if(error.error.message=="...@"){
        Swal.fire({
          title: 'enviado..',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.issloading=false;
        this.router.navigate(['/panelusuario/gestionpracticasppp/verconvocatorias',this.cedula]);
      }else {
        Swal.fire({
          title: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.issloading=false;
      }
    })
  }

  generarDocumento(proyecto:Solicitudproyecto) {
    console.log(this.obtnerDatosanexo2(proyecto))
    var pipe:DatePipe = new DatePipe('en-US')
    var anexo:Anexo2=this.obtnerDatosanexo2(proyecto);
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/leo/src/assets/docs/Anexo2.docx", function(
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
        // @ts-ignore
        fecha:anexo.fecha,
        siglas: anexo.siglasCarrera,
        anio: anexo.anio,
        nro: anexo.numeroConvocatoria,
        ciclo: anexo.ciclo,
        carrera: anexo.carrera,
        empresa: anexo.empresa,
        tb1: proyecto.actividadeslistProyectos,
        tb2: proyecto.requisitoslistProyectos,
        nombre_responsableppp: anexo.nombreResponsable,
        fecha_max:pipe.transform(anexo.fechaMaxRecepcion,'dd/MM/yyyy'),
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
      saveAs(out, "Anexo2 "+anexo.nombreResponsable+" Covocatoria Nª"+anexo.numeroConvocatoria+"de"+anexo.carrera+".docx");
    });
  }
}
