import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo9tutoracademicoComponent } from './anexo9tutoracademico.component';

describe('Anexo9tutoracademicoComponent', () => {
  let component: Anexo9tutoracademicoComponent;
  let fixture: ComponentFixture<Anexo9tutoracademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo9tutoracademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo9tutoracademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
