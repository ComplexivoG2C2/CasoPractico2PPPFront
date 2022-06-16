import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {TutorEmpresarial} from "../../../../models/tutorEmpresarial";
import {FechaService} from "../../../../services/fecha.service";
import {ActivatedRoute} from "@angular/router";
import {Empresa} from "../../../../models/empresa";
import Swal from "sweetalert2";
import {TutempresarialService} from "../../../../services/tutempresarial.service";

@Component({
  selector: 'app-listar-tutor',
  templateUrl: './listar-tutor.component.html',
  styleUrls: ['./listar-tutor.component.css']
})
export class ListarTutorComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  tutor:TutorEmpresarial[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<TutorEmpresarial[]>;

  constructor(private fechaService:FechaService,private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,private tutorS:TutempresarialService) { }

  ngOnInit(): void {
    this.tutorS.getTutoresAll().subscribe(value => {
      this.tutor=value;
      this.isexist=value.length!=0;
      this.issloading=false;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter(values)),
      );
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  filter(value: any): Empresa[] {
    const filterValue = value.toLowerCase();
    return this.tutor.filter(option => option.nombres?.toLowerCase().includes(filterValue)
      ||option.apellidos?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.correo?.toLocaleLowerCase().includes(filterValue)
    );
  }

  eliminarEntidad(tutorD:TutorEmpresarial){
    // console.log(entidad)
    Swal.fire({
      title: 'Eliminar Tutor',
      text: "Seguro que quiere eliminar al tutor: "+tutorD.nombres +" "+ tutorD.apellidos,
      icon: 'warning',
      showCancelButton: true,
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      iconColor:"#b72020",
      background: "#fbc02d",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.issloading=true;
        //this.tutorS.(Number(empresa.id)).subscribe(value => {
          Swal.fire({
            title: 'Eliminado',

            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.issloading=false;
        // },error => {
        //   Swal.fire({
        //     title: 'Ha surgido un error',
        //     text: "Hubo un error",
        //     icon: 'warning',
        //     iconColor :'#b72020',
        //     color: "#0c3255",
        //     confirmButtonColor:"#0c3255",
        //     background: "#fbc02d",
        //   })
        // })
      }
      this.issloading=false;
    })
  }
}
