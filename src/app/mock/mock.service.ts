import {Injectable, Inject } from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import { ResponseOptions, Response, RequestMethod } from "@angular/http";
import { UtilsService } from '../utils/utils.service';
import { isNumber } from 'util';
import { APP_CONFIG } from '../config/app.config';
import 'rxjs/add/operator/delay';

@Injectable()
export class MockBackendService {

  public nextPageId: string;
  public currentItemsNumber: number;

  private URL_PARAMS_REGEX: RegExp = /pageId=(_[0-9]+)/;

  constructor(
    private backend: MockBackend,
    private utils: UtilsService,
    @Inject(APP_CONFIG) private config: IConfig
  ) {}

  start(): void {
    this.backend.connections
      .delay(this.config.fakeApiDelay)
      .subscribe((c: MockConnection) => {

      const URL = this.config.apiUrl + 'images';

      if (c.request.url.includes(URL) && c.request.method === RequestMethod.Get) {
        // initial request
        if (!this.nextPageId) {

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(this.generateResponse())
          })));
        // check if pageIds matches
        } else if(this.nextPageId === c.request.url.match(this.URL_PARAMS_REGEX)[1]) {

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(this.generateResponse())
          })));

        }

      }
    });
  }

  /**
   * Creates url string for calling random image api with the desired with and height
   * @param sizeX Default = 400
   * @param sizeY Default = 400
   * @returns {string}
   */
  public getRandomImageUrl(sizeX: number = this.config.defaultImageSizeX, sizeY: number = this.config.defaultImageSizeY) {

    if (!isNumber(sizeX) || sizeX <= 0) {
      sizeX = this.config.defaultImageSizeX;
    }

    if (!isNumber(sizeY) || sizeY <= 0) {
      sizeY = this.config.defaultImageSizeY;
    }

    return this.config.imageApiUrl.replace(/{x}/g, sizeX.toFixed(0)).replace(/{y}/g, sizeY.toFixed(0)) +
       // prevent caching
      `?random=${this.utils.getRandomInteger(0, 1000)}`;
  }

  public generateResponse(): IMockBackendResponse {

    this.currentItemsNumber = this.utils.getRandomInteger(this.config.minItemCount, this.config.maxItemCount);

    this.nextPageId = `_${this.utils.getRandomInteger(0, 1000)}${Date.now().toString()}`;

    const response: IMockBackendResponse = {
      pageId: this.nextPageId,
      items: []
    };

    for (let i = 0; i < this.currentItemsNumber; i++) {
      response.items.push(this.getRandomImageUrl());
    }

    return response;
  }

}