import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroconvenioComponent } from './registroconvenio.component';

describe('RegistroconvenioComponent', () => {
  let component: RegistroconvenioComponent;
  let fixture: ComponentFixture<RegistroconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroconvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
