/**
 * Created by arkhemlol on 25.06.2017.
 */
export const config: IConfig = {
    apiUrl: `http://localhost:4200/api/`,
    imageApiUrl: 'http://lorempixel.com/{x}/{y}',
    defaultImageSizeX: 300,
    defaultImageSizeY: 200,
    maxItemCount: 1000,
    minItemCount: 1,
    itemsOnPage: 9,
    fakeApiDelay: 200
};
import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken("app.config");