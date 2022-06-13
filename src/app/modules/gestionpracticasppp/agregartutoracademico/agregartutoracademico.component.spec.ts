import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartutoracademicoComponent } from './agregartutoracademico.component';

describe('AgregartutoracademicoComponent', () => {
  let component: AgregartutoracademicoComponent;
  let fixture: ComponentFixture<AgregartutoracademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregartutoracademicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregartutoracademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
