import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolicitudesestudianteComponent } from './versolicitudesestudiante.component';

describe('VersolicitudesestudianteComponent', () => {
  let component: VersolicitudesestudianteComponent;
  let fixture: ComponentFixture<VersolicitudesestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersolicitudesestudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersolicitudesestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
