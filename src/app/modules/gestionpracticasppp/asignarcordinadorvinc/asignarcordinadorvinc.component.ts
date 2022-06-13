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


  constructor(private router: Router,private _formBuilder: FormBuilder,
              private fb: FormBuilder,private cordinadorvinculacionService:CordinadorvinculacionService) { }

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
      title: 'Confirme su Asignacion',
      showCancelButton: true,
      color: "#030000",
      confirmButtonColor:"#0086ff",
      background: "#ffffff",
      cancelButtonColor: '#dda733',
      confirmButtonText: 'Aceptar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.cordinadorvinculacionService.existCordinadorVinculacion(docente.cedula+"").subscribe(data=>{
          if(data==true){
            docente.estado=true;
            this.cordinadorvinculacionService.updateCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Asignado Correctamente',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              this.router.navigate(['/panelusuario/gestionpracticasppp/vercordinadorvinculacion']);
            },err => {
              Swal.fire({
                title: 'error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            })
          }else{
            docente.estado=true;
            this.cordinadorvinculacionService.saveCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Asignacion completada',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              this.router.navigate(['/panelusuario/gestionpracticasppp/vercordinadorvinculacion']);
            },err => {
              Swal.fire({
                title: 'error',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            })
          }
        })
      }
    })

  }

}
