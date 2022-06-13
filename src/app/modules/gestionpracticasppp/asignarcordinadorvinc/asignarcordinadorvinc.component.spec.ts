import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarcordinadorvincComponent } from './asignarcordinadorvinc.component';

describe('AsignarcordinadorvincComponent', () => {
  let component: AsignarcordinadorvincComponent;
  let fixture: ComponentFixture<AsignarcordinadorvincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarcordinadorvincComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarcordinadorvincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
