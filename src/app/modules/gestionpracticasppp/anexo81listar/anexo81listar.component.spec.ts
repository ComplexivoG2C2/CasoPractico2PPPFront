import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo81listarComponent } from './anexo81listar.component';

describe('Anexo81listarComponent', () => {
  let component: Anexo81listarComponent;
  let fixture: ComponentFixture<Anexo81listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo81listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo81listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
