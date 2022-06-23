import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo15Component } from './anexo15.component';

describe('Anexo15Component', () => {
  let component: Anexo15Component;
  let fixture: ComponentFixture<Anexo15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
