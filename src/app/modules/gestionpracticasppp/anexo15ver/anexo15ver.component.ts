import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {Anexo14Service} from "../../../services/anexo14.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Anexo11} from "../../../models/anexo11";
import {saveAs} from "file-saver";
import {Anexo15} from "../../../models/anexo15";
import {Anexo15Service} from "../../../services/anexo15.service";

@Component({
  selector: 'app-anexo15ver',
  templateUrl: './anexo15ver.component.html',
  styleUrls: ['./anexo15ver.component.css']
})
export class Anexo15verComponent implements OnInit {


  issloading = true;
  isexist?: boolean;
  panelOpenState = false;
  nombre?: String;
  cedula?:String;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo15[]>;
  anexo15: Anexo15[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo15Service: Anexo15Service, private sanitizer: DomSanitizer) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
      this.cedula = cedula;
      this.anexo15Service.getAnexo15().subscribe(value => {
        this.anexo15 = value.filter(va => va.cedulatutoracademico == this.cedula);

        this.isexist = value.length != 0;
        this.issloading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.anexo15)
      })
    })

  }

  filter(value: any): Anexo15[] {
    const filterValue = value.toLowerCase();
    return this.anexo15.filter(option => option.nombresEstudiante?.toLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.siglascarrera?.toLocaleLowerCase().includes(filterValue)
    );
  }

  safeUrl: any;

  //url 2 where the need to use an add
  getSafeUrl(docum: any) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(docum);
  }

  convertFile(docum: any) {
    //console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo15.pdf');
    //console.log(file);
    saveAs(file, 'Anexo15.pdf');
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
