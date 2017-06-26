import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { ImagesService } from './images.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackendService } from '../mock/mock.service';
import { APP_CONFIG, config } from '../config/app.config';

describe('ImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagesService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
        },
        {
          provide: APP_CONFIG, useValue: config
        },
        MockBackendService
      ]
    });
  });

  it('should be created', inject([ImagesService], (service: ImagesService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch images from backend', inject([ImagesService, APP_CONFIG], (service: ImagesService, config: IConfig) => {
    service.getImages().subscribe((images: IMockBackendResponse) => {
      expect(images).toBeTruthy();
      expect(images.pageId).toBeTruthy();
      expect(images.items.length).toBeGreaterThanOrEqual(config.minItemCount);
      expect(images.items.length).toBeLessThanOrEqual(config.maxItemCount);
      expect(images.items[0]).toEqual(jasmine.any(String));
    });
  }));

});
