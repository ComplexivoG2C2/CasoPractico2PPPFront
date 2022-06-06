import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CordinadorVinculacion} from "../../../models/cordinadorvinculacion";
import {map, Observable, startWith} from "rxjs";
import {Router} from "@angular/router";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-asignarcordinadorvinc',
  templateUrl: './asignarcordinadorvinc.component.html',
  styleUrls: ['./asignarcordinadorvinc.component.css']
})
export class AsignarcordinadorvincComponent implements OnInit {
  issloading=true;
  isexist?:boolean;
  isLinear = true;
  myControl = new FormControl();
  firstFormGroup!: FormGroup;
  cordinador:CordinadorVinculacion[]=[];
  cordinadorselect:CordinadorVinculacion=new CordinadorVinculacion();
  filteredOptions?: Observable<CordinadorVinculacion[]>;


  constructor(private router: Router,private _formBuilder: FormBuilder, private fb: FormBuilder,private cordinadorvinculacionService:CordinadorvinculacionService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });

    this.cordinadorvinculacionService.getCordinadorVinculacion().subscribe(data=>{
      this.isexist=data.filter(value => value.estado==true).length==0
      this.cordinador=data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter(values)),
      );
      this.issloading=false;
    })

  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    },1000)
  }

  selectionCordinador(cordinadorselect: MatSelectionListChange){
    this.cordinadorselect=cordinadorselect.option.value
    console.log(this.cordinadorselect.nombres)
  }

  filter(value: any): CordinadorVinculacion[] {
    const filterValue = value.toLowerCase();
    return this.cordinador.filter(option => option.nombres?.toLowerCase().includes(filterValue)
      ||option.apellidos?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.carga?.toLocaleLowerCase().includes(filterValue)
      ||option.titulo?.toLocaleLowerCase().includes(filterValue)
    );
  }


  guardarcordinadorvinc(docente:CordinadorVinculacion):void{
    Swal.fire({
      title: 'Confirmación',
      text: "Oprima el boton Aceptar para terminar la Asignacion.",
      icon: 'warning',
      showCancelButton: true,
      color: "#ffffff",
      confirmButtonColor:"#0086ff",
      background: "#455a64",
      cancelButtonColor: '#dda733',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cordinadorvinculacionService.existCordinadorVinculacion(docente.cedula+"").subscribe(data=>{
          if(data==true){
            docente.estado=true;
            this.cordinadorvinculacionService.updateCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Asignado Correctamente',
                text: 'El docente ha sido asignado.',
                icon: 'success',
                iconColor :'#0088ff',
                color: "#f7f7fa",
                confirmButtonColor:"#0c3255",
                background: "#455a64",
              })
              this.router.navigate(['/panelusuario/gestionpracticasppp/vercordinadorvinculacion']);
            },err => {
              Swal.fire({
                title: 'Ha surgido un error',
                text: "error",
                icon: 'warning',
                color: "#f9fafc",
                confirmButtonColor:"#0c3255",
                background: "#455a64",
              })
            })
          }else{
            docente.estado=true;
            this.cordinadorvinculacionService.saveCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Listo',
                text: 'Se a completado la asignacion',
                icon: 'success',
                iconColor :'#007cff',
                color: "#fcfcfc",
                confirmButtonColor:"#0c3255",
                background: "#455a64",
              })
              this.router.navigate(['/panelusuario/gestionpracticasppp/vercordinadorvinculacion']);
            },err => {
              Swal.fire({
                title: 'Ha surgido un error',
                text: "error",
                icon: 'warning',
                color: "#f6f6f6",
                confirmButtonColor:"#0c3255",
                background: "#455a64",
              })
            })
          }
        })
      }
    })

  }

}
