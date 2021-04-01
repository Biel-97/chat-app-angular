import { TestBed } from '@angular/core/testing';

import { CallComponentsService } from './call-components.service';

describe('CallComponentsService', () => {
  let service: CallComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
