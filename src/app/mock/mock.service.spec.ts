import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { MockBackendService } from './mock.service';
import { UtilsService } from '../utils/utils.service';
import { APP_CONFIG, config } from '../config/app.config';

describe('MockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackendService,
        MockBackend,
        UtilsService,
        {
          provide: APP_CONFIG, useValue: config
        },
      ]
    });
  });

  it('should be created', inject([MockBackendService], (service: MockBackendService) => {
    expect(service).toBeTruthy();
  }));

  it('should create correct image api url', inject([MockBackendService], (service: MockBackendService) => {
    expect(service.getRandomImageUrl()).toEqual(`https://unsplash.it/400/400/?random`);
    expect(service.getRandomImageUrl(300, 200)).toEqual(`https://unsplash.it/300/200/?random`);
    expect(service.getRandomImageUrl(0, 0)).toEqual(`https://unsplash.it/400/400/?random`);
    expect(service.getRandomImageUrl(-200, -300)).toEqual(`https://unsplash.it/400/400/?random`);
  }));

  it('should generate response', inject([MockBackendService], (service: MockBackendService) => {
    expect(service.generateResponse()).toBeDefined();
  }));

  it('should generate response with pageId', inject([MockBackendService], (service: MockBackendService) => {
    expect(service.generateResponse().pageId).toEqual(service.nextPageId);
  }));

  it('should generate response with items', inject([MockBackendService], (service: MockBackendService) => {
    expect(service.generateResponse().items.length).toEqual(service.currentItemsNumber);
  }));

  it('should generate response with unique pageId', inject([MockBackendService], (service: MockBackendService) => {
    const firstPageId = service.generateResponse().pageId;
    const secondPageId = service.generateResponse().pageId;
    expect(firstPageId).not.toEqual(secondPageId);
  }));

});
