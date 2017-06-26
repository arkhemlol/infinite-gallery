import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService
      ]
    });
  });

  it('should be created', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));

  it('should create random integer', inject([UtilsService], (service: UtilsService) => {
    expect(service.getRandomInteger(0, 100)).toBeGreaterThanOrEqual(0);
    expect(service.getRandomInteger(0, 100)).toBeLessThanOrEqual(100);
    expect(service.getRandomInteger(0.45, 1.23)).toBeLessThanOrEqual(2);
    expect(service.getRandomInteger(0.45, 1.23)).toBeGreaterThanOrEqual(0);
    expect(service.getRandomInteger(-45, -50)).toBeLessThanOrEqual(-45);
    expect(service.getRandomInteger(-45, -50)).toBeGreaterThanOrEqual(-50);
  }));
});
