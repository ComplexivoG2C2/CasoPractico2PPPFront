import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo7listarComponent } from './anexo7listar.component';

describe('Anexo7listarComponent', () => {
  let component: Anexo7listarComponent;
  let fixture: ComponentFixture<Anexo7listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo7listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo7listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
