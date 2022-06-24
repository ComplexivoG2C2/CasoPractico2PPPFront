import { TestBed } from '@angular/core/testing';

import { Anexo7tutorempService } from './anexo7tutoremp.service';

describe('Anexo7tutorempService', () => {
  let service: Anexo7tutorempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo7tutorempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
