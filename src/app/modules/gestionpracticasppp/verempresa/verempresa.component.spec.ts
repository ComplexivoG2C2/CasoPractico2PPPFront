import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerempresaComponent } from './verempresa.component';

describe('VerempresaComponent', () => {
  let component: VerempresaComponent;
  let fixture: ComponentFixture<VerempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
