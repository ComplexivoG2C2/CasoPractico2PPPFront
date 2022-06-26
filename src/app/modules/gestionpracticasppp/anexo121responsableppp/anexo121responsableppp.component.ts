import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {saveAs} from "file-saver";
import {map, Observable, startWith} from "rxjs";
import {Anexo11} from "../../../models/anexo11";
import {DomSanitizer} from "@angular/platform-browser";
import {Anexo121Service} from "../../../services/anexo121.service";
import {Anexo121} from "../../../models/anexo121";
import {ResponsablepppService} from "../../../services/responsableppp.service";

@Component({
  selector: 'app-anexo121responsableppp',
  templateUrl: './anexo121responsableppp.component.html',
  styleUrls: ['./anexo121responsableppp.component.css']
})
export class Anexo121responsablepppComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;
  nombre?:String;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo121[]>;
  anexo121:Anexo121[]=[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,private responsablepppService:ResponsablepppService,
              private anexo121Service:Anexo121Service,private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']

        this.responsablepppService.getResposablepppbyAll().subscribe(value => {
          this.anexo121Service.getAll().subscribe(value1 => {
            this.isexist=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera).length!=0;
            this.anexo121=value1.filter(value2 => value2.siglascarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera)
            console.log(this.anexo121)
            this.isexist = value.length != 0;
            this.issloading = false;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(values => this.filter(values)),
            );
          })
        })
    })
  }




  filter(value: any): Anexo121[] {
    const filterValue = value.toLowerCase();
    return this.anexo121.filter(option => option.nombresEstudiante?.toLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
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
    var file = this.dataURLtoFile(docum, 'Anexo12_1.pdf');
    //console.log(file);
    saveAs(file, 'Anexo12_1.pdf');
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
