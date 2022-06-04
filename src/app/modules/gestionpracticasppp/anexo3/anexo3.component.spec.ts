import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo3Component } from './anexo3.component';

describe('Anexo3Component', () => {
  let component: Anexo3Component;
  let fixture: ComponentFixture<Anexo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
