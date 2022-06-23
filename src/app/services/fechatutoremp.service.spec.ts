import { TestBed } from '@angular/core/testing';

import { FechatutorempService } from './fechatutoremp.service';

describe('FechatutorempService', () => {
  let service: FechatutorempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechatutorempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
