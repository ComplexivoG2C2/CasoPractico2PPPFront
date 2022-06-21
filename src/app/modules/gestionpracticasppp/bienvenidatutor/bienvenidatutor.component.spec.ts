import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidatutorComponent } from './bienvenidatutor.component';

describe('BienvenidatutorComponent', () => {
  let component: BienvenidatutorComponent;
  let fixture: ComponentFixture<BienvenidatutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidatutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidatutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
