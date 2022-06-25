import { TestBed } from '@angular/core/testing';

import { Anexo13Service } from './anexo13.service';

describe('Anexo13Service', () => {
  let service: Anexo13Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo13Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
