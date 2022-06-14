import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo8respuestaalestudianteComponent } from './anexo8respuestaalestudiante.component';

describe('Anexo8respuestaalestudianteComponent', () => {
  let component: Anexo8respuestaalestudianteComponent;
  let fixture: ComponentFixture<Anexo8respuestaalestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo8respuestaalestudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo8respuestaalestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
