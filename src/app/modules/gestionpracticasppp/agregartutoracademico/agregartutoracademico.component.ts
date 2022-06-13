import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {actividadeslistProyectos, DocentesDelegados, Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Docentes} from "../../../models/docentes";
import {Anexo1} from "../../../models/anexo1";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmpresaService} from "../../../services/empresa.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {TutoracademicoService} from "../../../services/tutoracademico.service";
import Swal from "sweetalert2";
import {MatSelectionListChange} from "@angular/material/list";
import {Actividadesanexo, Anexo2} from "../../../models/anexo2";
import {Materias} from "../../../models/materias";
import {MateriasService} from "../../../services/materias.service";
import {Anexo2Service} from "../../../services/anexo2.service";

@Component({
  selector: 'app-agregartutoracademico',
  templateUrl: './agregartutoracademico.component.html',
  styleUrls: ['./agregartutoracademico.component.css']
})
export class AgregartutoracademicoComponent implements OnInit {

  isexist?: boolean;
  isLinear = true;
  myControlconvocatoria = new FormControl();
  filteredOptionsconvocatoria?: Observable<Solicitudproyecto[]>;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirdFormGroup?: FormGroup;
  solicitudes: Solicitudproyecto[] = [];
  solicitudproyectoselect: Solicitudproyecto = new Solicitudproyecto();
  actividadesanexo: Actividadesanexo[] = []
  anexo2: Anexo2 = new Anexo2();
  numeroConvocatoria?: String;
  data: Date = new Date();
  iddesolicitud?: Number;


  /////Agregar Actividades y requisitos
  panelOpenState = true;
  issloading = true;
  //ArrayActividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;
  materias: Materias[] = [];
  proyecto: Solicitudproyecto = new Solicitudproyecto();
  seleccionmaterias: Materias[] = [];
  filteredOptions?: Observable<Materias[]>;
  cedula?: String;


  //////////TUTOR ACADEMICO
  // @ts-ignore
  // @ts-ignore
  fourFormGroup: FormGroup;

  docentes:Docentes[]=[];
  docentesselectDirector:Docentes = new Docentes();
  docentesselectApoyo:Docentes[]=[]
  anexo1:Anexo1[]=[];
  delegados: DocentesDelegados[]=[];
  myControldocente = new FormControl();
  myControl1 = new FormControl();
  filteredOptionsdocente?: Observable<Docentes[]>;
  filteredOptionsapoyo?: Observable<Docentes[]>;

  //
  carrera?: String;
  Siglas?:String;
  CedulaC?:String;
  NombreC?:String
  Fechaat?:Date;
  idproyecto?:Number;
  codigoProyecto?:Number;




  constructor(private router: Router, private fechaService: FechaService, private carrerasService: CarrerasService,
              private responsablepppService: ResponsablepppService,
              private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private proyectoService: ProyectoService,
              private materiasService: MateriasService, private anexo2Service: Anexo2Service, private tacademicoService:TutoracademicoService) {
    //ArrayActividades
    this.addForm = this._formBuilder.group({});
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

    }, 1000)
  }

  ngOnInit(): void {
    //ArrayActividades
    this.addForm.get("items_value")?.setValue("");
    this.addForm.addControl('rows', this.rows);

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      let cedula = params['cedula']
      this.cedula = cedula;

      ////convocatoria
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {
          console.log("solicitudes" + value1)
          this.isexist = value1.filter(value2 => value2.codigocarrera == value.filter(value3 => value3.cedula == cedula)[0]).length == 0;
          this.solicitudes = value1.filter(value2 => value2.codigocarrera == value.filter(value3 => value3.cedula == cedula)[0].codigoCarrera && value2.estado == true)
          this.anexo2Service.getAnexo2().subscribe(anexo2 => {

            if (anexo2.filter(fil => fil.siglasCarrera == this.solicitudes[0].codigocarrera).length == 0) {
              console.log("codigocarera" + anexo2)
              this.numeroConvocatoria = "1";
            } else {
              // @ts-ignore
              this.numeroConvocatoria = (Number(anexo2.filter(fil => fil.siglasCarrera == this.solicitudes[0].codigocarrera).pop().numeroConvocatoria) + 1).toString();
            }
            console.log("codigocarera" + anexo2)
          })
          this.issloading = false;
          this.filteredOptionsconvocatoria = this.myControlconvocatoria.valueChanges.pipe(
            startWith(''),
            map(values => this.filtersolicitudes(values)),
          );
        })
      })


    })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({

    });
    this.fourFormGroup = this._formBuilder.group({

    });
  }



//filtros  de las solicitudes de las empresas

  filtersolicitudes(value: any): Solicitudproyecto[] {
    const filterValue = value.toLowerCase();
    return this.solicitudes.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      || option.nombre?.toLocaleLowerCase().includes(filterValue)
      || option.nombretutoremp?.toLocaleLowerCase().includes(filterValue)
      || option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }
  idppp?:Number;
  //event para la selecion de la solicitud
  selectionProyecto(proyectoselect: MatSelectionListChange) {
    this.solicitudproyectoselect = proyectoselect.option.value

    this.proyectoService.getSolicitudesbyid(Number(this.solicitudproyectoselect.id)).subscribe(value => {
      console.log(Number(this.solicitudproyectoselect.id) + "CODIGOOOOOO SOLICITUD")
      this.proyecto = value;

      this.idppp=this.proyecto.id
      this.responsablepppService.getDocentesbyAll().subscribe(value => {
        this.docentes=value;
        this.filteredOptionsapoyo = this.myControl1.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter0(values)),
        );
      })

    })
  }



  filter0(value: any): Docentes[] {
    const filterValue = value.toString().toLowerCase();
    return this.docentes.filter(option => option.nombres_completo?.toLowerCase().includes(filterValue)
      ||option.titulo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.docente_tipo_tiempo?.toLocaleLowerCase().includes(filterValue)
    ).slice(0,10);
  }



  //Tabla
  addApoyo(docente:Docentes){
    if(this.docentesselectApoyo.filter(value => value.cedula==docente.cedula).length==0){
      this.docentesselectApoyo.push(docente);
    }
    this.obtnerDatos();
  }
  removeApoyo(docente:Docentes){
    this.docentesselectApoyo.forEach((element,index)=>{
      if(element.cedula==docente.cedula) this.docentesselectApoyo.splice(index,1);
    });
    this.obtnerDatos();
  }

  public displayDedicacion (dedicacionSel:Docentes): string {
    if (dedicacionSel != null && dedicacionSel.nombres_completo!="null"){
      return dedicacionSel.nombres_completo+"";
    }else{
      return "";
    }
  }

  docentesDelagados:DocentesDelegados= new DocentesDelegados();
  docentesAnexo1: Anexo1 = new Anexo1();
  obtnerDatos(){
    this.anexo1.length=0;
    this.delegados.length=0;
    this.docentesselectApoyo.forEach(value => {
      this.docentesAnexo1 = new Anexo1();
      this.docentesDelagados = new DocentesDelegados();
      this.docentesAnexo1.docenteTitulo=value.titulo;
      this.docentesAnexo1.documento=""
      this.docentesAnexo1.cedulaDelegado=value.cedula;
      this.docentesAnexo1.nombreDelegado=value.nombres_completo;
      this.docentesAnexo1.nombreRol="tutoracademico"
      this.docentesAnexo1.cedulaCoordinador=this.CedulaC;
      this.docentesAnexo1.nombreCoordinador=this.NombreC;
      this.docentesAnexo1.siglasCarrera=this.Siglas;
      this.docentesAnexo1.nombreCarrera=this.carrera;
      this.docentesAnexo1.fechaDelegacion=this.Fechaat;
      this.docentesAnexo1.nombreProyecto=this.proyecto.nombre;
      this.anexo1.push(this.docentesAnexo1)
      this.docentesDelagados.cedula=value.cedula;
      this.docentesDelagados.estado=true;
      this.docentesDelagados.cargo="apoyo";
      this.delegados.push(this.docentesDelagados)
    })
    this.docentesAnexo1 = new Anexo1();
    this.docentesDelagados = new DocentesDelegados();
    this.docentesAnexo1.docenteTitulo=this.docentesselectDirector.titulo;
    this.docentesAnexo1.documento=""
    this.docentesAnexo1.cedulaDelegado=this.docentesselectDirector.cedula;
    this.docentesAnexo1.nombreDelegado=this.docentesselectDirector.nombres_completo;
    this.docentesAnexo1.nombreRol="director"
    this.docentesAnexo1.cedulaCoordinador=this.CedulaC;
    this.docentesAnexo1.nombreCoordinador=this.NombreC;
    this.docentesAnexo1.siglasCarrera=this.Siglas;
    this.docentesAnexo1.nombreCarrera=this.carrera;
    this.docentesAnexo1.fechaDelegacion=this.Fechaat;
    this.docentesAnexo1.nombreProyecto=this.proyecto.nombre;
    this.anexo1.push(this.docentesAnexo1)
    this.docentesDelagados.cedula=this.docentesselectDirector.cedula;;
    this.docentesDelagados.estado=true;
    this.docentesDelagados.cargo="dp";
    this.delegados.push(this.docentesDelagados)
  }




  agregartutoresacademicos(proyectos: Solicitudproyecto,anexo1:Anexo1[]){
    var a1=0;
    var a2=0;
    proyectos.docentesDelegados=this.delegados;
    proyectos.coordinadorCedula=this.CedulaC
    console.log("dentro del metodo de actualizar"+proyectos.docentesDelegados)
    // @ts-ignore
    proyectos.id=this.idppp;

    var a1=anexo1.length;
    anexo1.forEach(value => {
      if (value.documento?.length==0){
        a2=a2+1;
      }
    })
    if(a1==a2){
      this.issloading=true;
      this.proyectoService.updateSolicitudes(proyectos).subscribe(value => {
        this.proyectoService.getSolicitudes().subscribe(value1 => {

          anexo1.forEach(value1 => {
            value1.idProyectoPPP=this.idppp;
            this.tacademicoService.saveAnexo1(value1).subscribe(value2 => {
              Swal.fire({
                title: 'Éxito',
                text: 'Tutorres Agregados.',
                icon: 'success',
                iconColor :'#17550c',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fbc02d",
              })
              this.router.navigate(['/panelusuario/proyectovinculacion/verproyecto',this.CedulaC,this.NombreC]);
              this.issloading=false;
            },error => {
              Swal.fire({
                title: 'Ha surgido un error',
                text: "Hubo un error, contáctese con TICs.",
                icon: 'error',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fbc02d",
              })
              this.issloading=false;
            })
          })
        })
      },error => {
        Swal.fire({
          title: 'Ha surgido un error',
          text: "...........",
          icon: 'error',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
        this.issloading=false;
      })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Faltan documentos',
        icon: 'warning',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    }
  }

}
