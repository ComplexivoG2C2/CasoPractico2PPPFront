import { TestBed } from '@angular/core/testing';

import { Anexo4Service } from './anexo4.service';

describe('Anexo4Service', () => {
  let service: Anexo4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
