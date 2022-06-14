import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tutor-empresarial',
  templateUrl: './tutor-empresarial.component.html',
  styleUrls: ['./tutor-empresarial.component.css']
})
export class TutorEmpresarialComponent implements OnInit {

  constructor(private activaterouter:ActivatedRoute,private route:Router ) { }

  ngOnInit(): void {
  }

}
