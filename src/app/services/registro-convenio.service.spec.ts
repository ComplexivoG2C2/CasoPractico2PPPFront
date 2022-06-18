import { TestBed } from '@angular/core/testing';

import { RegistroConvenioService } from './registro-convenio.service';

describe('RegistroConvenioService', () => {
  let service: RegistroConvenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroConvenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
