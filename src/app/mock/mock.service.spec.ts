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

  it('should create correct image api url', inject([MockBackendService, APP_CONFIG], (service: MockBackendService, config: IConfig) => {
    expect(service.getRandomImageUrl().includes(`http://lorempixel.com/${config.defaultImageSizeX}/${config.defaultImageSizeY}?random`)).toBeTruthy();
    expect(service.getRandomImageUrl(300, 200).includes(`http://lorempixel.com/${config.defaultImageSizeX}/${config.defaultImageSizeY}?random`)).toBeTruthy();
    expect(service.getRandomImageUrl(0, 0).includes(`http://lorempixel.com/${config.defaultImageSizeX}/${config.defaultImageSizeY}?random`)).toBeTruthy();
    expect(service.getRandomImageUrl(-200, -300).includes(`http://lorempixel.com/${config.defaultImageSizeX}/${config.defaultImageSizeY}?random`)).toBeTruthy();
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
