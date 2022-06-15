import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo31Component } from './anexo31.component';

describe('Anexo31Component', () => {
  let component: Anexo31Component;
  let fixture: ComponentFixture<Anexo31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo31Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
