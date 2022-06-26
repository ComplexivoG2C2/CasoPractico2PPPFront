import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo15mostrartodosComponent } from './anexo15mostrartodos.component';

describe('Anexo15mostrartodosComponent', () => {
  let component: Anexo15mostrartodosComponent;
  let fixture: ComponentFixture<Anexo15mostrartodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo15mostrartodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo15mostrartodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
