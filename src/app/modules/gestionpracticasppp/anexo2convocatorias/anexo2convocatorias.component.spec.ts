import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo2convocatoriasComponent } from './anexo2convocatorias.component';

describe('Anexo2convocatoriasComponent', () => {
  let component: Anexo2convocatoriasComponent;
  let fixture: ComponentFixture<Anexo2convocatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo2convocatoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo2convocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
