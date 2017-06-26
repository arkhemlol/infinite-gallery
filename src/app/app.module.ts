import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { MockBackendService } from './mock/mock.service';
import { APP_CONFIG, config } from './config/app.config';
import { UtilsService } from './utils/utils.service';
import { ImagesService } from './images/images.service';

// see https://github.com/angular/angular/issues/11262
export function httpFactory(backend: MockBackend, options: BaseRequestOptions) { return new Http(backend, options); }

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: httpFactory
    },
    {
      provide: APP_CONFIG, useValue: config
    },
    MockBackendService,
    UtilsService,
    ImagesService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
