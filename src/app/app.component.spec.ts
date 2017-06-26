import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { MockBackendService } from './mock/mock.service';
import { MockBackend } from '@angular/http/testing';
import { UtilsService } from './utils/utils.service';
import { APP_CONFIG, config } from './config/app.config';
import { ImagesComponent } from './images/images.component';

let comp: AppComponent,
    fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ImagesComponent
      ],
      providers: [
        MockBackend,
        UtilsService,
        MockBackendService,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
        },
        {
          provide: APP_CONFIG, useValue: config
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  // }));

  it('should start fake backend on init', fakeAsync(() => {

    const mockService = fixture.debugElement.injector.get(MockBackendService);

    spyOn(mockService, 'start');

    comp.ngOnInit();

    expect(mockService.start).toHaveBeenCalled();

  }));

});
