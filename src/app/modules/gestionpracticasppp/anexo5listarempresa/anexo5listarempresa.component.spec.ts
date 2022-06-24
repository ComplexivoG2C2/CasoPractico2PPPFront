import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo5listarempresaComponent } from './anexo5listarempresa.component';

describe('Anexo5listarempresaComponent', () => {
  let component: Anexo5listarempresaComponent;
  let fixture: ComponentFixture<Anexo5listarempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo5listarempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo5listarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
