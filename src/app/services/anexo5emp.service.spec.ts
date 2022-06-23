import { TestBed } from '@angular/core/testing';

import { Anexo5empService } from './anexo5emp.service';

describe('Anexo5empService', () => {
  let service: Anexo5empService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo5empService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
