import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo11listarComponent } from './anexo11listar.component';

describe('Anexo11listarComponent', () => {
  let component: Anexo11listarComponent;
  let fixture: ComponentFixture<Anexo11listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo11listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo11listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
