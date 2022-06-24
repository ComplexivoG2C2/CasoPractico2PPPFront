import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo7firmarComponent } from './anexo7firmar.component';

describe('Anexo7firmarComponent', () => {
  let component: Anexo7firmarComponent;
  let fixture: ComponentFixture<Anexo7firmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo7firmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo7firmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
