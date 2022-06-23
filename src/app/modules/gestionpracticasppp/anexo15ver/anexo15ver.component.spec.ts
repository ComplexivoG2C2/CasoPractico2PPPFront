import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo15verComponent } from './anexo15ver.component';

describe('Anexo15verComponent', () => {
  let component: Anexo15verComponent;
  let fixture: ComponentFixture<Anexo15verComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo15verComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo15verComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
