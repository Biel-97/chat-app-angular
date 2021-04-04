import { TestBed } from '@angular/core/testing';

import { AuthRoomGuard } from './auth-room.guard';

describe('AuthRoomGuard', () => {
  let guard: AuthRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
