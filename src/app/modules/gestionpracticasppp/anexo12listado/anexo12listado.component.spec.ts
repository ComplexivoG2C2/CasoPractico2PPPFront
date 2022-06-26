import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo12listadoComponent } from './anexo12listado.component';

describe('Anexo12listadoComponent', () => {
  let component: Anexo12listadoComponent;
  let fixture: ComponentFixture<Anexo12listadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo12listadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo12listadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
