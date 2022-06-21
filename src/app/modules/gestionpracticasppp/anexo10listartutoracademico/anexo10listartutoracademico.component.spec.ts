import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo10listartutoracademicoComponent } from './anexo10listartutoracademico.component';

describe('Anexo10listartutoracademicoComponent', () => {
  let component: Anexo10listartutoracademicoComponent;
  let fixture: ComponentFixture<Anexo10listartutoracademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo10listartutoracademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo10listartutoracademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
