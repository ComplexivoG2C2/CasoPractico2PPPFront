import { Component, OnInit } from '@angular/core';
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {Solicitudproyecto} from "../../../models/solicitudproyecto";
import {Anexo11} from "../../../models/anexo11";
import {FormBuilder, FormControl} from "@angular/forms";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Anexo11Service} from "../../../services/anexo11.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo81} from "../../../models/anexo81";
import {DomSanitizer} from "@angular/platform-browser";
import {map, Observable, startWith} from "rxjs";
import {Anexo6} from "../../../models/anexo6";
import {Anexo5} from "../../../models/anexo5";
import {DateAdapter} from "@angular/material/core";
import {Anexo5tutorempresaService} from "../../../services/anexo5tutorempresa.service";

function loadFile(url:any, callback:any) {
  PizZipUtils.getBinaryContent(url, callback);
}
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-anexo11listar',
  templateUrl: './anexo11listar.component.html',
  styleUrls: ['./anexo11listar.component.css']
})
export class Anexo11listarComponent implements OnInit {
  // issloading=true;
  // isexist?:boolean;
  // panelOpenState = false;
  //
  // cedula?:String;
  // nombre?:String;
  // myControl = new FormControl();
  // filteredOptions?: Observable<Anexo11[]>;
  //
  // anexo11:Anexo11[]=[];
//   constructor(private _formBuilder: FormBuilder,
//               private fechaService:FechaService,private carrerasService:CarrerasService,
//               private activatedRoute: ActivatedRoute,
//               private router:Router,
//               private proyectoService:ProyectoService,
//               private anexo2Service:Anexo2Service,
//               private responsablepppService:ResponsablepppService,
//               private anexo11Service:Anexo11Service,
//               private anexo1Service:Anexo1Service,
//               private   sanitizer: DomSanitizer) { }
//
//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe( params => {
//       let cedula = params['cedula']
//       let nombre = params['nombres']
//       this.cedula=cedula;
//       this.nombre=nombre;
//         this.anexo11Service.getAnexo11().subscribe(value1 => {
//             this.anexo11=value1.filter(value2 => value2.nombreDirectorDocenteApoyo==nombre)
//           console.log(this.anexo11+"d,vvvdd")
//           this.issloading=false;
//           this.filteredOptions = this.myControl.valueChanges.pipe(
//             startWith(''),
//             map(values=>this.filter(values)),
//           );
//         })
//
//     })
//   }
//
// filter(value: any): Anexo11[] {
//   const filterValue = value.toLowerCase();
//   return this.anexo11.filter(option => option.carrera?.toLowerCase().includes(filterValue)
//     ||option.nombretutoremp?.toLocaleLowerCase().includes(filterValue)
//     ||option.nombreDirectorDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
//   );
// }
//
//   safeUrl: any;
//   //url 2 where the need to use an add
//   getSafeUrl(docum:any){
//     this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
//   }
//
//   //convert a pdf
//   convertFile(docum:any) {
//     //Usage example:
//     var file = this.dataURLtoFile(docum, 'Anexo11.pdf');
//     saveAs(file, 'Anexo11.pdf');
//   }
//   dataURLtoFile(dataurl:any, filename:any) {
//     let arr = dataurl.split(','),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]),
//       n = bstr.length,
//       u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
//   }


  issloading=true;
  isexist?:boolean;
  panelOpenState = false;
nombre?:String;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo11[]>;
  anexo11:Anexo11[]=[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo11Service:Anexo11Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre=nombre;
      this.anexo11Service.getAnexo11().subscribe(value => {
        this.anexo11=value.filter(va=>va.nombreDirectorDocenteApoyo==this.nombre);

        this.isexist = value.length != 0;
        this.issloading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.anexo11)
      })
      })

  }

  filter(value: any): Anexo11[] {
    const filterValue = value.toLowerCase();
    return this.anexo11.filter(option => option.nombreest?.toLowerCase().includes(filterValue)
      ||option.cedulaest?.toLocaleLowerCase().includes(filterValue)
      ||option.siglascarrera?.toLocaleLowerCase().includes(filterValue)
    );
  }

  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum:any){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }

  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo11.pdf');
    //console.log(file);
    saveAs(file, 'Anexo11.pdf');
  }

  dataURLtoFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }


}

