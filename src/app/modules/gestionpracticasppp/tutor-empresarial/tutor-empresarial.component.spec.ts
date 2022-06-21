import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorEmpresarialComponent } from './tutor-empresarial.component';

describe('TutorEmpresarialComponent', () => {
  let component: TutorEmpresarialComponent;
  let fixture: ComponentFixture<TutorEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorEmpresarialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
