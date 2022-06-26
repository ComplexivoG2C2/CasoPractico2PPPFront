import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {map, Observable, startWith} from "rxjs";
import {Materias} from "../../../models/materias";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {MatSelectionListChange} from "@angular/material/list";
import {FechaempService} from "../../../services/fechaemp.service";
import {MatSelectChange} from "@angular/material/select";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {EmpresaService} from "../../../services/empresa.service";
import {DateAdapter} from "@angular/material/core";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {RegistroConvenio} from "../../../models/registroConvenio";
import {RegistroConvenioService} from "../../../services/registro-convenio.service";
import {Empresa} from "../../../models/empresa";
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
  selector: 'app-registroconvenio',
  templateUrl: './registroconvenio.component.html',
  styleUrls: ['./registroconvenio.component.css']
})
export class RegistroconvenioComponent implements OnInit {


  pipe: DatePipe = new DatePipe('en-US')

  issloading = true;
  isLinear = true;
  isexist?: boolean;
  activate?: boolean = true;
  activar?: boolean = false;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  sixthFormGroup!: FormGroup;
  seventhFormGroup!: FormGroup;
  eighthFormGroup!: FormGroup;


  //ArrayAntividades
  rows: FormArray;
  itemForm?: FormGroup;

  rows2: FormArray;
  itemForm2?: FormGroup;
  registroConvenio2:RegistroConvenio = new RegistroConvenio();
  registroConvenio1:RegistroConvenio=new RegistroConvenio();
  registroConvenios:RegistroConvenio[]=[];

  data:Date = new Date();
  fechaactual?:Date;

  filteredOptionsEmpresa?: Observable<Empresa[]>;
  myControl= new FormControl();
  empresaselect:Empresa=new Empresa();
  naturaleza?:String;
  carrera?:String;
  cedula?:String;
  empresas:Empresa[]=[];
  nombres?:String;
  id?:Number;
ff?:Date;
  constructor(
    private router: Router,
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private empresaS: EmpresaService,
    private _adapter: DateAdapter<any>,
    private registroConvenioService:RegistroConvenioService,private empresaService:EmpresaService,
    //private fechaempService:FechaempService,
    private cordinadorvinculacionService:CordinadorvinculacionService,
  ) {
    this._adapter.setLocale('es-ec');
// this.secondFormGroup=this._formBuilder.group({});
//     this.seventhFormGroup=this._formBuilder.group({});
//     this.rows2 = this._formBuilder.array([]);
//     this.rows = this._formBuilder.array([]);
    this.secondFormGroup=this._formBuilder.group({
      items:[null,Validators.required],
      items_value:['no',Validators.required],
    });
    this.rows = this._formBuilder.array([]);

    this.seventhFormGroup=this._formBuilder.group({
      items:[null,Validators.required],
      items_value:['no',Validators.required],
    });
    this.rows2 = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
    },1000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{

      let cedula=params['cedula']
      let nombres=params['nombres']
      this.nombres=nombres;
      this.cedula=cedula;

      console.log("si funciona"+ this.cedula);
      this.empresaService.getEmpresaAll().subscribe(value=>{
        this.empresas=value
        this.filteredOptionsEmpresa = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.ff = value.fecha;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      a:['',Validators.required],
      naturaleza:['',Validators.required],
      d:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({
      e:['',Validators.required],
      f:['',Validators.required],
      g:['',Validators.required],
      h:['',Validators.required],
      i:['',Validators.required],
      j:['',Validators.required],
      k:['',Validators.required],
      l:['',Validators.required],
       empresa:['',Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      p:['',Validators.required],

      s:['',Validators.required],
      t:['',Validators.required],
      u:['',Validators.required],
      v:['',Validators.required],

      re:['',Validators.required],
      y:['',Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      docx:['',Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      a1:['',Validators.required],
      b2:['',Validators.required],
      c3:['',Validators.required],
    });
    this.seventhFormGroup = this._formBuilder.group({

    });
    this.eighthFormGroup = this._formBuilder.group({
      d4:['',Validators.required],
      f5:['',Validators.required],

    });


    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);

    this.seventhFormGroup.get("items_value")?.setValue("yes");
    this.seventhFormGroup.addControl('rows2', this.rows2);
    console.log("analizar")
    this.issloading=false;
  }
  filter(value: any): Empresa[] {
    const filterValue = value.toLowerCase();
    return this.empresas.filter(option => option.nombre?.toLowerCase().includes(filterValue)
    );
  }
  onAddRow(codActividad:String) {
    this.rows.push(this.createItemFormGroup(codActividad));
  }

  onAddRow2(actividadesRealizar:String) {
    this.rows2.push(this.createItemFormGroup2(actividadesRealizar));
  }

  createItemFormGroup(codActividad:String): FormGroup {
    return this._formBuilder.group({
      codActividad:[codActividad,Validators.required],
      actividades:['',Validators.required]
    });
  }

  createItemFormGroup2(actividadesRealizar:String): FormGroup {
    return this._formBuilder.group({
      actividadesRealizar:[actividadesRealizar,Validators.required]
    });
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex)
    this.rows.getRawValue().forEach(element => {
      console.log(element)
    })
  }

  onRemoveRow2(rowIndex:number){
    this.rows2.removeAt(rowIndex)
    this.rows2.getRawValue().forEach(element => {
      console.log(element)
    })
  }

  obtenerDatos():RegistroConvenio{

    this.registroConvenio2.anioInforme="2022";
    this.registroConvenio2.empresa_id=1;
    this.registroConvenio2.nroTutoresEmpresa=1;
    this.registroConvenio2.fechaConvenio=this.ff;
    this.registroConvenio2.nombreAdminConvenio=this.nombres;
    this.registroConvenio2.actividadEconomicaRuc=this.rows.getRawValue();
    this.registroConvenio2.nombreEmpresa=this.empresaselect.nombre;
    this.registroConvenio2.emailEmpresa=this.empresaselect.emailEmpresa;
    this.registroConvenio2.nombreRepreEmpresa=this.empresaselect.representante;
    this.registroConvenio2.tlfContactoEmpresa=this.empresaselect.telefonoEmpresa;
    this.registroConvenio2.cantonMatrizEmpresa=this.empresaselect.ciudad;
    this.registroConvenio2.cantonSucursalEmpresa=this.empresaselect.ciudad;
    this.registroConvenio2.callePrincipalEmpresa=this.empresaselect.direccion;
    this.registroConvenio2.cargoRepreEmpresa=this.empresaselect.titulorepresentante;
    this.registroConvenio2.direccionSucursalEmpresa=this.empresaselect.direccion;
    this.registroConvenio2.actividadesRealizars=this.rows2.getRawValue();
    return this.registroConvenio2;
  }

  obtenerGestion(event:MatSelectChange){
    this.naturaleza=this.registroConvenio2.naturalezaEntidad;
  }
  selectionEmpresa(empresaselect: MatSelectionListChange) {
    this.empresaselect = empresaselect.option.value
  }

  obtenerCarrera(event:MatSelectChange){
    this.carrera=this.registroConvenio2.carrera;
  }

  guardar(){
    this.registroConvenio2 =this.obtenerDatos();
    this.registroConvenioService.saveRegistroConvenio(this.obtenerDatos()).subscribe(datos=>{
      // console.log(">."+this.anexo8Service.saveAnexo8(this.ontnerDatos()))
      Swal.fire({
        title: 'Convenio Generado',
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
        title: 'Debe tener empresas registradas',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      window.location.reload();
    })

  }

  subirDocumento9(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        //console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.registroConvenio2.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.registroConvenio2.documento=docx+"";
        }
      })
    }
  }

  ggenerarDocumento9() {
    var registroConvenio:RegistroConvenio=this.obtenerDatos();
    // console.log(registroConvenio)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/ComplexivoG2C2/CasoPractico2PPPFront/oscar/src/assets/docs/registroConvenios.docx", function(
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
        codigoInforme:registroConvenio.codigoInforme,
        anioInforme:registroConvenio.anioInforme,
        fechaConvenio:registroConvenio.fechaConvenio,
        nombreEmpresa:registroConvenio.nombreEmpresa,
        naturalezaEntidad:registroConvenio.naturalezaEntidad,
        nombreRepreEmpresa:registroConvenio.nombreRepreEmpresa,
        rucEmpresa:registroConvenio.rucEmpresa,

        tb1:registroConvenio.actividadEconomicaRuc,

        anioConvenio:registroConvenio.anioConvenio,
        nroEstudiantes:registroConvenio.nroEstudiantes,
        totalEstudiantes:registroConvenio.totalEstudiantes,
        nombreTutorAcademico:registroConvenio.nombreTutorAcademico,
        tlfTutorA:registroConvenio.tlfTutorA,
        nombreTutorEmpresa:registroConvenio.nombreTutorEmpresa,
        cargoTutorEmpresa:registroConvenio.cargoTutorEmpresa,
        tlfTutorEmpresa:registroConvenio.tlfTutorEmpresa,
        emailEmpresa:registroConvenio.emailEmpresa,
        tlfContactoEmpresa:registroConvenio.tlfContactoEmpresa,
        provinciaMatrizEmpresa:registroConvenio.provinciaMatrizEmpresa,
        cantonMatrizEmpresa:registroConvenio.cantonMatrizEmpresa,
        callePrincipalEmpresa:registroConvenio.callePrincipalEmpresa,
        numIdentificacionEdificio:registroConvenio.numIdetificacionEdificio,
        calleSecundariaMatrizEmpresa:registroConvenio.calleSecundariaMatrizEmpresa,
        referenciaEmpresa:registroConvenio.referenciaEmpresa,
        provinciaSucursalEmpresa:registroConvenio.provinciaSucursalEmpresa,
        cantonSucursalEmpresa:registroConvenio.cantonSucursalEmpresa,
        direccionSucursalEmpresa:registroConvenio.direccionSucursalEmpresa,
        carrera:registroConvenio.carrera,
        cargoAdminConvenioIsta:registroConvenio.cargoAdminConvenioIsta,
        cargoRepreEmpresa:registroConvenio.cargoRepreEmpresa,
        justificacionEmpresa:registroConvenio.justificacionEmpresa,
        nombreRectorIsta:registroConvenio.nombreRectorIsta,
        fechaNombramiento:registroConvenio.fechaNombramiento,

        tb2:registroConvenio.actividadesRealizars,

        nroTutoresEmpresa:1,
        conclusionesConvenio:registroConvenio.conclusionesConvenio,
        recomendacionesConvenio:registroConvenio.recomendacionesConvenio,
        nombreAdminConvenio:registroConvenio.nombreAdminConvenio,
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
          // console.log("errorMessages", errorMessages);
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
      saveAs(out, "registroConvenios.docx");
    });
  }


}
