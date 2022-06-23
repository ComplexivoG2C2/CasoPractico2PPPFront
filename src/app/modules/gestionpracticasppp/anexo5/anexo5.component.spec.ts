import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo5Component } from './anexo5.component';

describe('Anexo5Component', () => {
  let component: Anexo5Component;
  let fixture: ComponentFixture<Anexo5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
