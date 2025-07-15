import { TestBed } from '@angular/core/testing';

import { CephfsService } from './cephfs.service';

describe('CephfsService', () => {
  let service: CephfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CephfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
