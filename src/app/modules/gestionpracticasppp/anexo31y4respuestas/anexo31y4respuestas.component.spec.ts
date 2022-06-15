import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo31y4respuestasComponent } from './anexo31y4respuestas.component';

describe('Anexo31y4respuestasComponent', () => {
  let component: Anexo31y4respuestasComponent;
  let fixture: ComponentFixture<Anexo31y4respuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo31y4respuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo31y4respuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
