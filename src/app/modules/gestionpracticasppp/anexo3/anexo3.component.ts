import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Anexo3} from "../../../models/anexo3";
import {Anexo3Service} from "../../../services/anexo3.service";

@Component({
  selector: 'app-anexo3',
  templateUrl: './anexo3.component.html',
  styleUrls: ['./anexo3.component.css']

})
export class Anexo3Component implements OnInit {

  issloading=true;
  isexist?:boolean
  cedula?:String;

  anexo3enproceso:Anexo3[]=[];
  anexo3aceptados:Anexo3[]=[];
  anexo3denagados:Anexo3[]=[];

  constructor(private anexo3Service:Anexo3Service,
             ) { }

  ngOnInit(): void {

  }

}
