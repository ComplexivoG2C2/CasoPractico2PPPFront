import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veranexo81Component } from './veranexo81.component';

describe('Veranexo81Component', () => {
  let component: Veranexo81Component;
  let fixture: ComponentFixture<Veranexo81Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Veranexo81Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Veranexo81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
