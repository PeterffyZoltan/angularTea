import { TestBed } from '@angular/core/testing';

import { TeadataService } from './teadata.service';

describe('TeadataService', () => {
  let service: TeadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
