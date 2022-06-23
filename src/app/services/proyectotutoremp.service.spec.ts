import { TestBed } from '@angular/core/testing';

import { ProyectotutorempService } from './proyectotutoremp.service';

describe('ProyectotutorempService', () => {
  let service: ProyectotutorempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectotutorempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
