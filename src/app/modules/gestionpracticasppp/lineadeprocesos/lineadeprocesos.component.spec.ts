import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineadeprocesosComponent } from './lineadeprocesos.component';

describe('LineadeprocesosComponent', () => {
  let component: LineadeprocesosComponent;
  let fixture: ComponentFixture<LineadeprocesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineadeprocesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineadeprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
