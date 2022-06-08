import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaempresaComponent } from './bienvenidaempresa.component';

describe('BienvenidaempresaComponent', () => {
  let component: BienvenidaempresaComponent;
  let fixture: ComponentFixture<BienvenidaempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
