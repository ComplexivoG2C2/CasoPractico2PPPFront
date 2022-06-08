import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolicutudesComponent } from './versolicutudes.component';

describe('VersolicutudesComponent', () => {
  let component: VersolicutudesComponent;
  let fixture: ComponentFixture<VersolicutudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersolicutudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersolicutudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
