import { TestBed } from '@angular/core/testing';

import { TestPostServiceService } from './test-post-service.service';

describe('TestPostServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestPostServiceService = TestBed.get(TestPostServiceService);
    expect(service).toBeTruthy();
  });
});
