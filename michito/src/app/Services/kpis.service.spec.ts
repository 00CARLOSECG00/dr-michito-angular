import { TestBed } from '@angular/core/testing';

import { KpisService } from './kpis.service';

describe('KpisService', () => {
  let service: KpisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
