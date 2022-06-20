import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstadoSolicitudesEmpresaComponent } from './ver-estado-solicitudes-empresa.component';

describe('VerEstadoSolicitudesEmpresaComponent', () => {
  let component: VerEstadoSolicitudesEmpresaComponent;
  let fixture: ComponentFixture<VerEstadoSolicitudesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEstadoSolicitudesEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstadoSolicitudesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
