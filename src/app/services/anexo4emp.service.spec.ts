import { TestBed } from '@angular/core/testing';

import { Anexo4empService } from './anexo4emp.service';

describe('Anexo4empService', () => {
  let service: Anexo4empService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo4empService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
