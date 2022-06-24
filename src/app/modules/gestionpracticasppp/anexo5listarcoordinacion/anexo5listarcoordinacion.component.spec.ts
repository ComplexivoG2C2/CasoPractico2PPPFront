import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo5listarcoordinacionComponent } from './anexo5listarcoordinacion.component';

describe('Anexo5listarcoordinacionComponent', () => {
  let component: Anexo5listarcoordinacionComponent;
  let fixture: ComponentFixture<Anexo5listarcoordinacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo5listarcoordinacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo5listarcoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
