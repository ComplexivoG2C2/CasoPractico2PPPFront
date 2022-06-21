import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo6listarComponent } from './anexo6listar.component';

describe('Anexo6listarComponent', () => {
  let component: Anexo6listarComponent;
  let fixture: ComponentFixture<Anexo6listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo6listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo6listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
