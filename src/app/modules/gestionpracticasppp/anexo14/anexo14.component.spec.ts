import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo14Component } from './anexo14.component';

describe('Anexo14Component', () => {
  let component: Anexo14Component;
  let fixture: ComponentFixture<Anexo14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
