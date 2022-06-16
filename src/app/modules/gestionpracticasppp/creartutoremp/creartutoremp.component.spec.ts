import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreartutorempComponent } from './creartutoremp.component';

describe('CreartutorempComponent', () => {
  let component: CreartutorempComponent;
  let fixture: ComponentFixture<CreartutorempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreartutorempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreartutorempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
