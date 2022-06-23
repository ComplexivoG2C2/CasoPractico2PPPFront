import { TestBed } from '@angular/core/testing';

import { Anexo31empService } from './anexo31emp.service';

describe('Anexo31empService', () => {
  let service: Anexo31empService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo31empService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
