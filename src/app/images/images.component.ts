import { Component, HostListener, Inject, OnInit, Query, Renderer2, ViewChild } from '@angular/core';
import { ImagesService } from './images.service';
import { APP_CONFIG } from '../config/app.config';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/reduce';
//import 'rxjs/add/observable/reduce';
import 'rxjs/add/observable/from';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/never';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    providers: [
        ImagesService
    ]
})
export class ImagesComponent implements OnInit {

    public items: string[] = [];

    @ViewChild('gallery')
    public gallery: any;

    public preloadedImages: HTMLImageElement[] = [];

    public preloader$ = new Subject<HTMLImageElement[]>();

    private preloaderSub: Subscription;

    public images$ = new Subject<string>();

    private imagesSub: Subscription;
    /**
     * Prevents immediate loading on scroll event,
     * When component has just inited
     * @type {boolean}
     */
    private onInitLoading: boolean = false;

    private currentScrollPosition: number = 0;

    /**
     * Threshold when scrolling bottom to start rendering images
     * @type {number}
     */
    private scrollThreshold = 250;

    private pageId: string;

    constructor(private ImagesService: ImagesService,
                @Inject(APP_CONFIG) private config: IConfig,
                private renderer: Renderer2,
                @Inject(DOCUMENT) private document: any) {
    }

    public ngOnInit() {

        this.imagesSub = this.images$
        // prevent too much requests on scroll event
          .debounceTime(100)
          .switchMap((pageId: string) => {
              return this.getImages(pageId);
          })
          // preload current and next pages
          .map((imageSources: string[]) => {
              return imageSources.slice(0, this.config.itemsOnPage * 2)
          })
          .subscribe((imagesSrc: string[]) => {
              this.createImages(imagesSrc);
          });

        this.preloaderSub = this.preloader$
          .subscribe((images: HTMLImageElement[]) => {
              this.onInitLoading = false;
              this.renderImages(images);
          });
        // start fetching images
        this.images$.next();

        this.onInitLoading = true;

    }

    public getImages(pageId?: string): Observable<string[]> {

        const isPreloadedEnough = this.preloadedImages.length > this.config.itemsOnPage * 2;

        const isLoadedEnough = !isPreloadedEnough && this.items.length > this.config.itemsOnPage * 2;

        if (isPreloadedEnough) {
            // send images direct to render
            this.preloader$.next(this.preloadedImages.slice(0, this.config.itemsOnPage));
            // remove rendered items from cache
            this.preloadedImages = this.preloadedImages.slice(this.config.itemsOnPage);
            return Observable.never();
        }

        if (isLoadedEnough) {
            // loaded data is enough, perform preloading of images
            const itemsToPreload = this.items.slice(0, this.config.itemsOnPage * 2);
            // we don't need items we are going to preload anymore
            this.items = this.items.slice(this.config.itemsOnPage * 2);
            return Observable.of(itemsToPreload);
        }

        // no data is enough, load it from the server
        return this.ImagesService.getImages(pageId)
          .switchMap((data: IMockBackendResponse) => {

              console.log('Retrieved ' + data.items.length + ' images with pageId ' + data.pageId);

              this.pageId = data.pageId;

              return Observable.of(data.items);
          })
          .switchMap((items: string[]) => {

              // if there is not enough items to render for two pages -
              // load new items and combine them
              // with already loaded items
              if (this.items.length < this.config.itemsOnPage * 2) {
                  this.items = this.items.concat(items);
                  return this.getImages(this.pageId);
              }

              this.items = items;

              return Observable.of(items);
          });
    }

    public $onDestroy() {
        this.imagesSub.unsubscribe();
        this.preloaderSub.unsubscribe();
    }

    public createImages(imgSources: string[]): void {
        const images = imgSources.map((src: string) => {

            const image = new Image(this.config.defaultImageSizeX, this.config.defaultImageSizeY);
            image.src = src;

            this.renderer.setStyle(image, 'border-radius', '25px');
            this.renderer.setStyle(image, 'box-shadow', '3px 3px 5px 0px rgba(0,0,0,0.75)');

            return image;

        });
        // update preloaded images cache
        this.preloadedImages = this.preloadedImages.concat(images);
        // sent to consumer
        this.preloader$.next(this.preloadedImages.slice(0, this.config.itemsOnPage));
        // we don't need these images anymore
        this.preloadedImages = this.preloadedImages.slice(this.config.itemsOnPage);
    }

    private renderImages(images: HTMLImageElement[]) {

        const htmlFragment = this.document.createDocumentFragment();

        images.forEach((imgEl: HTMLImageElement) => {

            const wrapper = this.renderer.createElement('div') as HTMLDivElement;
            this.renderer.addClass(wrapper, 'gallery__image');
            wrapper.appendChild(imgEl);

            htmlFragment.appendChild(wrapper);
        });

        this.gallery.nativeElement.appendChild(htmlFragment);

    }

    @HostListener('document:scroll', ['$event'])
    public onScroll(event: MouseEvent) {

        const scrollTop = (event.target as Document).body.scrollTop;
        // check if we are scrolling down
        if (this.currentScrollPosition < scrollTop) {

            const isScrollNearBottom = (event.target as Document).body.scrollHeight - scrollTop
              - (event.target as Document).documentElement.clientHeight < this.scrollThreshold;
            // add or render new images when scroll is near bottom
            if (isScrollNearBottom && !this.onInitLoading) {
                this.images$.next(this.pageId);
            }
        }

        this.currentScrollPosition = scrollTop;

    }

}
