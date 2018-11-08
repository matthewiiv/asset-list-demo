import { TestBed } from '@angular/core/testing';

import { AssetDataService } from './asset-data.service';

describe('AssetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetDataService = TestBed.get(AssetDataService);
    expect(service).toBeTruthy();
  });
});
