import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorempreComponent } from './tutorempre.component';

describe('TutorempreComponent', () => {
  let component: TutorempreComponent;
  let fixture: ComponentFixture<TutorempreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorempreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorempreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
