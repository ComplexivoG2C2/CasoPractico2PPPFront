import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpreComponent } from './empre.component';

describe('EmpreComponent', () => {
  let component: EmpreComponent;
  let fixture: ComponentFixture<EmpreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
