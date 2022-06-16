import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadossolicitudComponent } from './estadossolicitud.component';

describe('EstadossolicitudComponent', () => {
  let component: EstadossolicitudComponent;
  let fixture: ComponentFixture<EstadossolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadossolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadossolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
