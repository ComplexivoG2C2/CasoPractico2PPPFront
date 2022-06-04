import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercordinadorvincComponent } from './vercordinadorvinc.component';

describe('VercordinadorvincComponent', () => {
  let component: VercordinadorvincComponent;
  let fixture: ComponentFixture<VercordinadorvincComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercordinadorvincComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VercordinadorvincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
