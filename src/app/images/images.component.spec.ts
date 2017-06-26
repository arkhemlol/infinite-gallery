import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ImagesComponent } from './images.component';
import { MockBackendService } from '../mock/mock.service';
import { APP_CONFIG, config } from '../config/app.config';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch images on init', () => {

    const service = fixture.debugElement.injector.get(ImagesService);

    const stub = {
      items: [
        'apiUrl'
      ],
      pageId: 'randomString'
    };

    spyOn(service, 'getImages').and.returnValue(
      Observable.of(stub)
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(service.getImages).toHaveBeenCalled();
    expect(component.items).toEqual(stub);
  });

  it('should create preloaded images elements', () => {
    const service = fixture.debugElement.injector.get(ImagesService);

    const stub = {
      items: [
        'https://unsplash.it/400/400/?random',
        'https://unsplash.it/400/400/?random'
      ],
      pageId: 'randomString'
    };

    spyOn(service, 'getImages').and.returnValue(
      Observable.of(stub)
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.preloadedImages.length).toEqual(2);
    expect(component.preloadedImages[0].width).toEqual(400);
    expect(component.preloadedImages[0].height).toEqual(400);
    expect(component.preloadedImages[1].src).toEqual('https://unsplash.it/400/400/?random');

  });

  it('should create images elements based on config values', inject([APP_CONFIG],(config: IConfig) => {
    const service = fixture.debugElement.injector.get(ImagesService);

    const stub = {
      items: [
        'https://unsplash.it/300/3300/?random',
        'https://unsplash.it/0/2321300/?random'
      ],
      pageId: 'randomString'
    };

    spyOn(service, 'getImages').and.returnValue(
      Observable.of(stub)
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.preloadedImages[0].width).toEqual(config.defaultImageSizeX);
    expect(component.preloadedImages[1].height).toEqual(config.defaultImageSizeY);

  }));


});
