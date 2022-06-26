import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo121responsablepppComponent } from './anexo121responsableppp.component';

describe('Anexo121responsablepppComponent', () => {
  let component: Anexo121responsablepppComponent;
  let fixture: ComponentFixture<Anexo121responsablepppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo121responsablepppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo121responsablepppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
