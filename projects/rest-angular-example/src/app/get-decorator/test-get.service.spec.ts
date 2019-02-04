import { TestBed } from '@angular/core/testing';

import { TestGetService } from './test-get.service';

describe('TestGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestGetService = TestBed.get(TestGetService);
    expect(service).toBeTruthy();
  });
});
