import { TestBed } from '@angular/core/testing';

import { Anexo5Service } from './anexo5.service';

describe('Anexo5Service', () => {
  let service: Anexo5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
