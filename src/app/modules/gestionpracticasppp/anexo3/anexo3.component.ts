import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo3} from "../../../models/anexo3";
import {Anexo3Service} from "../../../services/anexo3.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";

@Component({
  selector: 'app-anexo3',
  templateUrl: './anexo3.component.html',
  styleUrls: ['./anexo3.component.css']

})
export class Anexo3Component implements OnInit {

  issloading = true;
  isexist?: boolean
  cedula?: String;

  anexo3enproceso: Anexo3[] = [];
  anexo3aceptados: Anexo3[] = [];
  anexo3denagados: Anexo3[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula = cedula;
      console.log(cedula)
    })

    this.issloading = false;


  }
}