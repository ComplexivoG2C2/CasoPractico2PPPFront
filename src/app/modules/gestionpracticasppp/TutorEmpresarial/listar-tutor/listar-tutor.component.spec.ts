import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTutorComponent } from './listar-tutor.component';

describe('ListarTutorComponent', () => {
  let component: ListarTutorComponent;
  let fixture: ComponentFixture<ListarTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
