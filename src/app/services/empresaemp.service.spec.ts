import { TestBed } from '@angular/core/testing';

import { EmpresaempService } from './empresaemp.service';

describe('EmpresaempService', () => {
  let service: EmpresaempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
