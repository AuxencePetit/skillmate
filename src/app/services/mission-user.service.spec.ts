import { TestBed } from '@angular/core/testing';

import { MissionUserService } from './mission-user.service';

describe('MissionUserService', () => {
  let service: MissionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
