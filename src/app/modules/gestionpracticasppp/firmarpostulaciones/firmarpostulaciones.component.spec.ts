import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarpostulacionesComponent } from './firmarpostulaciones.component';

describe('FirmarpostulacionesComponent', () => {
  let component: FirmarpostulacionesComponent;
  let fixture: ComponentFixture<FirmarpostulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmarpostulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmarpostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
