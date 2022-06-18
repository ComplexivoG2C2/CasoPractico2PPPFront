import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConvenioComponent } from './registro-convenio.component';

describe('RegistroConvenioComponent', () => {
  let component: RegistroConvenioComponent;
  let fixture: ComponentFixture<RegistroConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
