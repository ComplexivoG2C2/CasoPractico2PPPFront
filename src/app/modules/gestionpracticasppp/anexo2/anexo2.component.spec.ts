import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo2Component } from './anexo2.component';

describe('Anexo2Component', () => {
  let component: Anexo2Component;
  let fixture: ComponentFixture<Anexo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
