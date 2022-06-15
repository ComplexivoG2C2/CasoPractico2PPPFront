import { TestBed } from '@angular/core/testing';

import { Anexo81Service } from './anexo8-1.service';

describe('Anexo81Service', () => {
  let service: Anexo81Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo81Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
