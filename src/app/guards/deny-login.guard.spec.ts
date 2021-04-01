import { TestBed } from '@angular/core/testing';

import { DenyLoginGuard } from './deny-login.guard';

describe('DenyLoginGuard', () => {
  let guard: DenyLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DenyLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
