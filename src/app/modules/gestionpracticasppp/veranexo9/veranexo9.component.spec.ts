import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veranexo9Component } from './veranexo9.component';

describe('Veranexo9Component', () => {
  let component: Veranexo9Component;
  let fixture: ComponentFixture<Veranexo9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Veranexo9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Veranexo9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
