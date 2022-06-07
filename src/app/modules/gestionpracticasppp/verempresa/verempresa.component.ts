import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Empresa} from "../../../models/empresa";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {FechaService} from "../../../services/fecha.service";
import {ActivatedRoute} from "@angular/router";
import {EmpresaService} from "../../../services/empresa.service";

@Component({
  selector: 'app-verempresa',
  templateUrl: './verempresa.component.html',
  styleUrls: ['./verempresa.component.css']
})
export class VerempresaComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  empresa:Empresa[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Empresa[]>;


  constructor(private fechaService:FechaService,private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getEmpresaAll().subscribe(value => {
      this.empresa=value;
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
    return this.empresa.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.celularRepresentante?.toLocaleLowerCase().includes(filterValue)
      ||option.celularRepresentante?.toLocaleLowerCase().includes(filterValue)
      ||option.emailEmpresa?.toLocaleLowerCase().includes(filterValue)
      ||option.representante?.toLocaleLowerCase().includes(filterValue)
      ||option.ciudad?.toLocaleLowerCase().includes(filterValue)
    );
  }


  eliminarEntidad(empresa:Empresa){
    // console.log(entidad)
    Swal.fire({
      title: 'Eliminar Empresa',
      text: "Seguro que quiere eliminar la empresa: "+empresa.nombre,
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
        this.empresaService.deleteEmpresa(Number(empresa.id)).subscribe(value => {
          Swal.fire({
            title: 'Eliminado',

            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.issloading=false;
        },error => {
          Swal.fire({
            title: 'Ha surgido un error',
            text: "Hubo un error",
            icon: 'warning',
            iconColor :'#b72020',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
        })
      }
      this.issloading=false;
    })
  }
}
