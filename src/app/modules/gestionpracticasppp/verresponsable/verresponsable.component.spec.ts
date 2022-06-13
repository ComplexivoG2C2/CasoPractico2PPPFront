import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerresponsableComponent } from './verresponsable.component';

describe('VerresponsableComponent', () => {
  let component: VerresponsableComponent;
  let fixture: ComponentFixture<VerresponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerresponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
