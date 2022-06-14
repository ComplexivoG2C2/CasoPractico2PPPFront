import { TestBed } from '@angular/core/testing';

import { Anexo8Service } from './anexo8.service';

describe('Anexo8Service', () => {
  let service: Anexo8Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo8Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
