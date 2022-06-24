import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo121Component } from './anexo121.component';

describe('Anexo121Component', () => {
  let component: Anexo121Component;
  let fixture: ComponentFixture<Anexo121Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo121Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo121Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
