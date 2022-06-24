import { TestBed } from '@angular/core/testing';

import { Anexo121Service } from './anexo121.service';

describe('Anexo121Service', () => {
  let service: Anexo121Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anexo121Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
