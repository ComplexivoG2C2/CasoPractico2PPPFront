import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo5listarComponent } from './anexo5listar.component';

describe('Anexo5listarComponent', () => {
  let component: Anexo5listarComponent;
  let fixture: ComponentFixture<Anexo5listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo5listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo5listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
