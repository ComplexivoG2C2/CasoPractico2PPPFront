import { TestBed } from '@angular/core/testing';

import { TutorempuserService } from './tutorempuser.service';

describe('TutorempuserService', () => {
  let service: TutorempuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorempuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
