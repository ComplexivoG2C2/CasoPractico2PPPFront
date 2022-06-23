import { TestBed } from '@angular/core/testing';

import { Anexo3empService } from './anexo3emp.service';

describe('Anexo3empService', () => {
  let service: Anexo3empService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo3empService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
