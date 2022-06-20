import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo6consultartutoracademicoComponent } from './anexo6consultartutoracademico.component';

describe('Anexo6consultartutoracademicoComponent', () => {
  let component: Anexo6consultartutoracademicoComponent;
  let fixture: ComponentFixture<Anexo6consultartutoracademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo6consultartutoracademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo6consultartutoracademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
