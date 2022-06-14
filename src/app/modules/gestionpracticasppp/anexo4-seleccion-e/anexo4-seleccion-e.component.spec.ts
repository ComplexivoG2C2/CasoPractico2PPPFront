import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo4SeleccionEComponent } from './anexo4-seleccion-e.component';

describe('Anexo4SeleccionEComponent', () => {
  let component: Anexo4SeleccionEComponent;
  let fixture: ComponentFixture<Anexo4SeleccionEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo4SeleccionEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo4SeleccionEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
