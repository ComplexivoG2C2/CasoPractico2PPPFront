import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo31y4listarComponent } from './anexo31y4listar.component';

describe('Anexo31y4listarComponent', () => {
  let component: Anexo31y4listarComponent;
  let fixture: ComponentFixture<Anexo31y4listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo31y4listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo31y4listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
