import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo9responsablepppComponent } from './anexo9responsableppp.component';

describe('Anexo9responsablepppComponent', () => {
  let component: Anexo9responsablepppComponent;
  let fixture: ComponentFixture<Anexo9responsablepppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo9responsablepppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo9responsablepppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
