import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo11firmasComponent } from './anexo11firmas.component';

describe('Anexo11firmasComponent', () => {
  let component: Anexo11firmasComponent;
  let fixture: ComponentFixture<Anexo11firmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo11firmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo11firmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
