import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroconvenioempresaverComponent } from './registroconvenioempresaver.component';

describe('RegistroconvenioempresaverComponent', () => {
  let component: RegistroconvenioempresaverComponent;
  let fixture: ComponentFixture<RegistroconvenioempresaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroconvenioempresaverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroconvenioempresaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
