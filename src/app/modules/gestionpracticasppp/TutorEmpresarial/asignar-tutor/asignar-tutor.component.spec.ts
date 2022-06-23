import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTutorComponent } from './asignar-tutor.component';

describe('AsignarTutorComponent', () => {
  let component: AsignarTutorComponent;
  let fixture: ComponentFixture<AsignarTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
