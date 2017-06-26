import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../config/app.config';

@Injectable()
export class ImagesService {

  constructor(private http: Http,
              @Inject(APP_CONFIG) private config: IConfig) { }

  public getImages(pageId?: string): Observable<IMockBackendResponse> {
    return this.http.get(`${this.config.apiUrl}images`, {
      params: {
        pageId: pageId
      }
    })
      .map((res: Response) => res.json());
  }

}
