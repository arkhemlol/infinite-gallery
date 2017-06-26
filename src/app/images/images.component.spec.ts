import { async, ComponentFixture, inject, TestBed, fakeAsync } from '@angular/core/testing';

import { ImagesComponent } from './images.component';
import { MockBackendService } from '../mock/mock.service';
import { APP_CONFIG, config } from '../config/app.config';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { tick } from "@angular/core/testing";

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

  it('should fetch images on init', fakeAsync(() => {

    const service = fixture.debugElement.injector.get(ImagesService);

    const stub = {
      items: [
        'apiUrl'
      ],
      pageId: 'randomString'
    };

    spyOn(component.images$, 'next').and.returnValue(null);

    spyOn(component, 'getImages').and.returnValue(Observable.of(stub));

    component.ngOnInit();

    fixture.detectChanges();

    tick(100);

    expect(component.images$.next).toHaveBeenCalled();

  }));


});
