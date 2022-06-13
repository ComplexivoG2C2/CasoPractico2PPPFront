import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Docentes} from "../../../models/docentes";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Resposableppp} from "../../../models/resposableppp";

@Component({
  selector: 'app-nuevoresponsableppp',
  templateUrl: './nuevoresponsableppp.component.html',
  styleUrls: ['./nuevoresponsableppp.component.css']
})
export class NuevoresponsablepppComponent implements OnInit {

  issloading = true;
  isexist?: boolean;
  isLinear = true;
  myControl = new FormControl();
  firstFormGroup!: FormGroup;
  filteredOptions?: Observable<Docentes[]>;
  docentes: Docentes[] = [];
  docentesselect: Docentes = new Docentes();
  public cedula?: string;
  public carrera?: string;
  panelOpenState = false;

  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private responsablepppService: ResponsablepppService) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });


    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      this.cedula = cedula;
      this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
        // @ts-ignore
        this.carrera = value[0].codigo;
        // @ts-ignore
        this.responsablepppService.getResposablepppbyCarrera(value[0].codigo).subscribe(data => {
        }, err => {
          this.isexist = true;
        })
      })
    })

    this.responsablepppService.getDocentesbyAll().subscribe(value => {
      this.docentes = value;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values => this.filter(values)),
      );
      this.issloading = false;
    })
  }


  filter(value: any): Docentes[] {
    const filterValue = value.toLowerCase();
    return this.docentes.filter(option => option.nombres_completo?.toLowerCase().includes(filterValue)
      || option.titulo?.toLocaleLowerCase().includes(filterValue)
      || option.cedula?.toLocaleLowerCase().includes(filterValue)
      || option.docente_tipo_tiempo?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionDocente(docenteselect: MatSelectionListChange) {
    this.docentesselect = docenteselect.option.value
    console.log(this.docentesselect.nombres_completo)
  }

  responsable: Resposableppp = new Resposableppp();

  obtnerdatos(docente: Docentes): Resposableppp {
    this.responsable.cedula = docente.cedula;
    this.responsable.coordinador_id = this.cedula;
    this.responsable.codigoCarrera = this.carrera;
    this.responsable.estado = true;
    this.responsable.cargo = "RPPP"
    this.responsable.fecha_inicio_periodo = docente.fecha_inicio_periodo;
    this.responsable.fecha_fin_periodo = docente.fecha_fin_periodo;
    return this.responsable;
  }

  //GuardarResaposableppp
  guardarResaposableppp(docente: Docentes): void {
    Swal.fire({
      title: 'Confirmación',
      text: "Responsable de prácticas ya a sido designado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ddad33',
      confirmButtonText: 'Aceptar',
      background: "#fffdfd"
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsablepppService.saveResposableppp(this.obtnerdatos(docente)).subscribe(value => {
          Swal.fire({
            title: 'Asignación Correcta',
            icon: 'success',
            iconColor: '#0082ff',
            color: "#090000",
            confirmButtonColor: "#0c3255",
            background: "#fdfdfd",
          })
          this.router.navigate(['/panelusuario/gestionpracticasppp/verresponsableppp', this.cedula]);
        }, error => {
          Swal.fire({
            title: 'Ha surgido un error',
            text: "Hubo un error",
            icon: 'warning',
            color: "#050000",
            confirmButtonColor: "#0c3255",
            background: "#f8f8f8",
          })
        })
      }
    })

  }
}
