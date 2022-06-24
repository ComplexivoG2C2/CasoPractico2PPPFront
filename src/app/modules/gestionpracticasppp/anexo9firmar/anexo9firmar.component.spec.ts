import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo9firmarComponent } from './anexo9firmar.component';

describe('Anexo9firmarComponent', () => {
  let component: Anexo9firmarComponent;
  let fixture: ComponentFixture<Anexo9firmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo9firmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo9firmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
