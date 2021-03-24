import { TestBed } from '@angular/core/testing';

import { SpreedlyService } from './spreedly.service';

describe('SpreedlyService', () => {
  let service: SpreedlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpreedlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
