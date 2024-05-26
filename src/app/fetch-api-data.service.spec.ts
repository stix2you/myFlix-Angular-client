import { TestBed } from '@angular/core/testing';

import { FetchApiDataService } from './fetch-api-data.service';

/**
 * @file fetch-api-data.service.spec.ts
 * @description Unit tests for FetchApiDataService.
 */
describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
