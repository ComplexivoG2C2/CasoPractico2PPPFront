import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo81Component } from './anexo81.component';

describe('Anexo81Component', () => {
  let component: Anexo81Component;
  let fixture: ComponentFixture<Anexo81Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo81Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
