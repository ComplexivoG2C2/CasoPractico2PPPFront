import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerestadoconvocatoriasComponent } from './verestadoconvocatorias.component';

describe('VerestadoconvocatoriasComponent', () => {
  let component: VerestadoconvocatoriasComponent;
  let fixture: ComponentFixture<VerestadoconvocatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerestadoconvocatoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerestadoconvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
