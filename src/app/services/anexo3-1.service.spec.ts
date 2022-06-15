import { TestBed } from '@angular/core/testing';

import { Anexo31Service } from './anexo3-1.service';

describe('Anexo31Service', () => {
  let service: Anexo31Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo31Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
