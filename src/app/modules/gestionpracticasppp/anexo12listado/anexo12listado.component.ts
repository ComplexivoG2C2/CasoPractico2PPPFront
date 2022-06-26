import { Component, OnInit } from '@angular/core';
import {Anexo12} from "../../../models/anexo12";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DateAdapter} from "@angular/material/core";
import {Anexo12empService} from "../../../services/anexo12emp.service";
import {saveAs} from "file-saver";
import {Anexo12Service} from "../../../services/anexo12.service";

@Component({
  selector: 'app-anexo12listado',
  templateUrl: './anexo12listado.component.html',
  styleUrls: ['./anexo12listado.component.css']
})
export class Anexo12listadoComponent implements OnInit {


  issloading = true;
  isexist?: boolean;
  panelOpenState = false;

  anexo12: Anexo12[] = [];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo12[]>;
  cedula?: String;
  nombres?: String;

  constructor(private router: Router, private fechaService: FechaService, private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder, private sanitizer: DomSanitizer,
              private _adapter: DateAdapter<any>,
              private anexo12Service: Anexo12Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let nombres = params['nombres']

      console.log("nombre del tutor empresarial" + this, nombres)
      this.anexo12Service.getAll().subscribe(value => {
        this.isexist = value.length != 0;
        this.anexo12 = value
        console.log(value + "si hay datos");

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        this.issloading = false;
        //console.log(value)
      })
    })
  }

  filter(value: any): Anexo12[] {
    const filterValue = value.toLowerCase();
    return this.anexo12.filter(option => option.nombresEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.carrera?.toLocaleLowerCase().includes(filterValue)
      || option.nombreApoyo?.toLocaleLowerCase().includes(filterValue)
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
    var file = this.dataURLtoFile(docum, 'Anexo12.pdf');
    // console.log(file);
    saveAs(file, 'Anexo12.pdf');
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
