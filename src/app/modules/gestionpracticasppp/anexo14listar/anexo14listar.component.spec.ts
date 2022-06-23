import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo14listarComponent } from './anexo14listar.component';

describe('Anexo14listarComponent', () => {
  let component: Anexo14listarComponent;
  let fixture: ComponentFixture<Anexo14listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo14listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo14listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
