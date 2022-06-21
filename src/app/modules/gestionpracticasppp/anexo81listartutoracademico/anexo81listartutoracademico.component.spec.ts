import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo81listartutoracademicoComponent } from './anexo81listartutoracademico.component';

describe('Anexo81listartutoracademicoComponent', () => {
  let component: Anexo81listartutoracademicoComponent;
  let fixture: ComponentFixture<Anexo81listartutoracademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo81listartutoracademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo81listartutoracademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
