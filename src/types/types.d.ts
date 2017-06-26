/**
 * Created by arkhemlol on 25.06.2017.
 */

interface IMockBackendResponse {
    items: string[];
    pageId: string;
}

interface IConfig {
    imageApiUrl: string;
    apiUrl: string;
    minItemCount: number;
    maxItemCount: number;
    itemsOnPage: number;
    defaultImageSizeX: number;
    defaultImageSizeY: number;
    fakeApiDelay: number;
}