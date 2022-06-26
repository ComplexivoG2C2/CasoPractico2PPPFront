import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Empresa} from "../../../models/empresa";
import {map, startWith} from "rxjs";

@Component({
  selector: 'app-tutor-empresarial',
  templateUrl: './tutor-empresarial.component.html',
  styleUrls: ['./tutor-empresarial.component.css']
})
export class TutorEmpresarialComponent implements OnInit {

  empresa:Empresa=new Empresa();
empresasid?:Number;
  constructor(private activatedRoute: ActivatedRoute,private route:Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.empresasid=id;

    })
  }

}
