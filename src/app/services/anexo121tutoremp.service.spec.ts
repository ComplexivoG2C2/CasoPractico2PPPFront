import { TestBed } from '@angular/core/testing';

import { Anexo121tutorempService } from './anexo121tutoremp.service';

describe('Anexo121tutorempService', () => {
  let service: Anexo121tutorempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo121tutorempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
