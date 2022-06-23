import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerestadosolicituempresaComponent } from './verestadosolicituempresa.component';

describe('VerestadosolicituempresaComponent', () => {
  let component: VerestadosolicituempresaComponent;
  let fixture: ComponentFixture<VerestadosolicituempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerestadosolicituempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerestadosolicituempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
