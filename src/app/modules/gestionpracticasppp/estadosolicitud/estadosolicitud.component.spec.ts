import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosolicitudComponent } from './estadosolicitud.component';

describe('EstadosolicitudComponent', () => {
  let component: EstadosolicitudComponent;
  let fixture: ComponentFixture<EstadosolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosolicitudComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
