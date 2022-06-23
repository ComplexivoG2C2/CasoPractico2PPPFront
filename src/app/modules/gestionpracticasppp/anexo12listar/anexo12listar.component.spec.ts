import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo12listarComponent } from './anexo12listar.component';

describe('Anexo12listarComponent', () => {
  let component: Anexo12listarComponent;
  let fixture: ComponentFixture<Anexo12listarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo12listarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo12listarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
