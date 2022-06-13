import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-bienvenidaempresa',
  templateUrl: './bienvenidaempresa.component.html',
  styleUrls: ['./bienvenidaempresa.component.css']
})
export class BienvenidaempresaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hol() {
    Swal.fire({
      title: 'هل تريد الاستمرار؟',
      icon: 'question',
      iconHtml: '؟',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true
    })
  }
}
