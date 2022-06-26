import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroconveniofirmarComponent } from './registroconveniofirmar.component';

describe('RegistroconveniofirmarComponent', () => {
  let component: RegistroconveniofirmarComponent;
  let fixture: ComponentFixture<RegistroconveniofirmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroconveniofirmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroconveniofirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
