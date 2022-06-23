import { Component, OnInit } from '@angular/core';
import Docxtemplater from "docxtemplater";
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
  selector: 'app-anexo11listar',
  templateUrl: './anexo11listar.component.html',
  styleUrls: ['./anexo11listar.component.css']
})
export class Anexo11listarComponent implements OnInit {

  panelOpenState = false;
  issloading=true;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo11[]>;
  anexo11:Anexo11 = new Anexo11();
  anexo11filter:Anexo11[]=[];
  // @ts-ignore
  date1:Date;
  // @ts-ignore
  date2:Date;
  proyecto:Solicitudproyecto = new Solicitudproyecto();
  constructor(private _formBuilder: FormBuilder,
              private fechaService:FechaService,private carrerasService:CarrerasService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private proyectoService:ProyectoService,
              private anexo2Service:Anexo2Service,
              private responsablepppService:ResponsablepppService,
              private anexo11Service:Anexo11Service,
              private anexo1Service:Anexo1Service,
              private   sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var date:String[];
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.anexo1Service.getAnexo1byCedula(cedula).subscribe(value => {
        this.anexo11Service.getAnexo11by(Number(value[value.length-1].idProyectoPPP)).subscribe(value1 => {


            this.anexo11filter=value;

            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(values=>this.filter(values)),
            );
            this.issloading=false;
            console.log("ghjioekmcmkcme")

            ///


        })
      })
    })
  }
  filter(value: any): Anexo11[] {
    const filterValue = value.toLowerCase();
    return this.anexo11filter.filter(option => option.carrera?.toLowerCase().includes(filterValue)
      ||option.empresa?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaest?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreest?.toLocaleLowerCase().includes(filterValue)
    );
  }

  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum:any){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }



  //convert a pdf
  convertFile(docum:any) {
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo11.pdf');
    saveAs(file, 'Anexo11.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }



}

