import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo14verComponent } from './anexo14ver.component';

describe('Anexo14verComponent', () => {
  let component: Anexo14verComponent;
  let fixture: ComponentFixture<Anexo14verComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo14verComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo14verComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
