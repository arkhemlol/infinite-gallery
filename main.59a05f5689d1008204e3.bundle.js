webpackJsonp([1],{"+h1B":function(e,t,n){"use strict";var i=n("/oeL"),r=n("aR8+"),a=n("wQAS"),o=n("q4dy"),s=n("qbdv"),u=n("fc+i"),l=n("9Es1"),c=n("CPp0"),d=n("p+YB"),f=n("Fb2S"),g=n("l6/X"),p=n("KFAf");n.d(t,"a",function(){return m});var m=i.b(r.a,[a.a],function(e){return i.c([i.d(512,i.e,i.f,[[8,[o.a]],[3,i.e],i.g]),i.d(5120,i.h,i.i,[[3,i.h]]),i.d(4608,s.a,s.b,[i.h]),i.d(4608,i.j,i.j,[]),i.d(5120,i.k,i.l,[]),i.d(5120,i.m,i.n,[]),i.d(5120,i.o,i.p,[]),i.d(4608,u.b,u.c,[u.d]),i.d(6144,i.q,null,[u.b]),i.d(4608,u.e,u.f,[]),i.d(5120,u.g,function(e,t,n,i){return[new u.h(e),new u.i(t),new u.j(n,i)]},[u.d,u.d,u.d,u.e]),i.d(4608,u.k,u.k,[u.g,i.r]),i.d(135680,u.l,u.l,[u.d]),i.d(4608,u.m,u.m,[u.k,u.l]),i.d(6144,i.s,null,[u.m]),i.d(6144,u.n,null,[u.l]),i.d(4608,i.t,i.t,[i.r]),i.d(4608,u.o,u.o,[u.d]),i.d(4608,u.p,u.p,[u.d]),i.d(4608,l.a,l.a,[]),i.d(4608,c.a,c.a,[]),i.d(5120,c.b,r.b,[l.a,c.a]),i.d(4608,d.a,d.a,[]),i.d(4608,f.a,f.a,[l.a,d.a,g.a]),i.d(4608,p.a,p.a,[c.b,g.a]),i.d(512,s.c,s.c,[]),i.d(1024,i.u,u.q,[]),i.d(1024,i.v,function(e,t){return[u.r(e,t)]},[[2,u.s],[2,i.w]]),i.d(512,i.x,i.x,[[2,i.v]]),i.d(131584,i.y,i.y,[i.r,i.z,i.A,i.u,i.e,i.x]),i.d(2048,i.B,null,[i.y]),i.d(512,i.C,i.C,[i.B]),i.d(512,u.t,u.t,[[3,u.t]]),i.d(512,r.a,r.a,[]),i.d(256,g.a,{apiUrl:"http://localhost:4200/api/",imageApiUrl:"http://lorempixel.com/{x}/{y}",defaultImageSizeX:300,defaultImageSizeY:200,maxItemCount:1e3,minItemCount:1,itemsOnPage:9,fakeApiDelay:200},[])])})},"/y5b":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[".gallery[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;min-height:120vh}.gallery__image[_ngcontent-%COMP%]{box-sizing:border-box;padding:20px;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-preferred-size:33%;flex-basis:33%}"]},0:function(e,t,n){e.exports=n("cDNt")},Fb2S:function(e,t,n){"use strict";var i=n("/oeL"),r=n("9Es1"),a=n("CPp0"),o=n("p+YB"),s=n("N+n4"),u=(n.n(s),n("l6/X")),l=n("l3Q+");n.n(l);n.d(t,"a",function(){return c});var c=function(){function e(e,t,n){this.backend=e,this.utils=t,this.config=n,this.URL_PARAMS_REGEX=/pageId=(_[0-9]+)/}return e.prototype.start=function(){var e=this;this.backend.connections.delay(this.config.fakeApiDelay).subscribe(function(t){var n=e.config.apiUrl+"images";t.request.url.includes(n)&&t.request.method===a.c.Get&&(e.nextPageId?e.nextPageId===t.request.url.match(e.URL_PARAMS_REGEX)[1]&&t.mockRespond(new a.d(new a.e({body:JSON.stringify(e.generateResponse())}))):t.mockRespond(new a.d(new a.e({body:JSON.stringify(e.generateResponse())}))))})},e.prototype.getRandomImageUrl=function(e,t){return void 0===e&&(e=this.config.defaultImageSizeX),void 0===t&&(t=this.config.defaultImageSizeY),(!n.i(s.isNumber)(e)||e<=0)&&(e=400),(!n.i(s.isNumber)(t)||t<=0)&&(t=400),this.config.imageApiUrl.replace(/{x}/g,e.toFixed(0)).replace(/{y}/g,t.toFixed(0))+"?random="+this.utils.getRandomInteger(0,1e3)},e.prototype.generateResponse=function(){this.currentItemsNumber=this.utils.getRandomInteger(this.config.minItemCount,this.config.maxItemCount),this.nextPageId="_"+this.utils.getRandomInteger(0,1e3)+Date.now().toString();for(var e={pageId:this.nextPageId,items:[]},t=0;t<this.currentItemsNumber;t++)e.items.push(this.getRandomImageUrl());return e},e.ctorParameters=function(){return[{type:r.a},{type:o.a},{type:IConfig,decorators:[{type:i.G,args:[u.a]}]}]},e}()},KFAf:function(e,t,n){"use strict";var i=n("/oeL"),r=n("CPp0"),a=n("5v8a"),o=(n.n(a),n("eqpX")),s=(n.n(o),n("l6/X"));n.d(t,"a",function(){return u});var u=function(){function e(e,t){this.http=e,this.config=t}return e.prototype.getImages=function(e){return this.http.get(this.config.apiUrl+"images",{params:{pageId:e}}).map(function(e){return e.json()})},e.ctorParameters=function(){return[{type:r.b},{type:IConfig,decorators:[{type:i.G,args:[s.a]}]}]},e}()},Kq16:function(e,t,n){"use strict";function i(e){return o._12(0,[o._20(402653184,1,{gallery:0}),(e()(),o._13(0,[[1,0],["gallery",1]],null,0,"div",[["class","gallery"]],null,null,null,null,null)),(e()(),o._18(null,["\n"]))],null,null)}function r(e){return o._12(0,[(e()(),o._13(0,null,null,2,"app-images",[],null,[["document","scroll"]],function(e,t,n){var i=!0;if("document:scroll"===t){i=!1!==o._14(e,2).onScroll(n)&&i}return i},i,g)),o._15(512,null,s.a,s.a,[u.b,l.a]),o._16(114688,null,0,c.a,[s.a,l.a,o._17,d.d],null,null)],function(e,t){e(t,2,0)},null)}var a=n("/y5b"),o=n("/oeL"),s=n("KFAf"),u=n("CPp0"),l=n("l6/X"),c=n("WfTK"),d=n("fc+i");n.d(t,"b",function(){return g}),t.a=i;var f=[a.a],g=o._11({encapsulation:0,styles:f,data:{}});o._19("app-images",c.a,r,{},{},[])},WfTK:function(e,t,n){"use strict";var i=n("/oeL"),r=n("KFAf"),a=n("l6/X"),o=n("fc+i"),s=n("Pic8"),u=(n.n(s),n("bKpL")),l=(n.n(u),n("/zHi")),c=(n.n(l),n("JNTq")),d=(n.n(c),n("Plqt")),f=(n.n(d),n("XL2q")),g=(n.n(f),n("rlar")),p=(n.n(g),n("azLz")),m=(n.n(p),n("dyFf"));n.n(m);n.d(t,"a",function(){return h});var h=function(){function e(e,t,n,i){this.ImagesService=e,this.config=t,this.renderer=n,this.document=i,this.items=[],this.preloadedImages=[],this.preloader$=new g.Subject,this.images$=new g.Subject,this.onInitLoading=!1,this.currentScrollPosition=0,this.scrollThreshold=250}return e.prototype.ngOnInit=function(){var e=this;this.imagesSub=this.images$.debounceTime(100).switchMap(function(t){return e.getImages(t)}).map(function(t){return t.slice(0,2*e.config.itemsOnPage)}).subscribe(function(t){e.createImages(t)}),this.preloaderSub=this.preloader$.subscribe(function(t){e.onInitLoading=!1,e.renderImages(t)}),this.images$.next(),this.onInitLoading=!0},e.prototype.getImages=function(e){var t=this,n=this.preloadedImages.length>2*this.config.itemsOnPage,i=!n&&this.items.length>2*this.config.itemsOnPage;if(n)return this.preloader$.next(this.preloadedImages.slice(0,this.config.itemsOnPage)),this.preloadedImages=this.preloadedImages.slice(this.config.itemsOnPage),u.Observable.never();if(i){var r=this.items.slice(0,2*this.config.itemsOnPage);return this.items=this.items.slice(2*this.config.itemsOnPage),u.Observable.of(r)}return this.ImagesService.getImages(e).switchMap(function(e){return console.log("Retrieved "+e.items.length+" images with pageId "+e.pageId),t.pageId=e.pageId,u.Observable.of(e.items)}).switchMap(function(e){return t.items.length<2*t.config.itemsOnPage?(t.items=t.items.concat(e),t.getImages(t.pageId)):(t.items=e,u.Observable.of(e))})},e.prototype.$onDestroy=function(){this.imagesSub.unsubscribe(),this.preloaderSub.unsubscribe()},e.prototype.createImages=function(e){var t=this,n=e.map(function(e){var n=new Image(t.config.defaultImageSizeX,t.config.defaultImageSizeY);return n.src=e,t.renderer.setStyle(n,"border-radius","25px"),t.renderer.setStyle(n,"box-shadow","3px 3px 5px 0px rgba(0,0,0,0.75)"),n});this.preloadedImages=this.preloadedImages.concat(n),this.preloader$.next(this.preloadedImages.slice(0,this.config.itemsOnPage)),this.preloadedImages=this.preloadedImages.slice(this.config.itemsOnPage)},e.prototype.renderImages=function(e){var t=this,n=this.document.createDocumentFragment();e.forEach(function(e){var i=t.renderer.createElement("div");t.renderer.addClass(i,"gallery__image"),i.appendChild(e),n.appendChild(i)}),this.gallery.nativeElement.appendChild(n)},e.prototype.onScroll=function(e){var t=e.target.body.scrollTop;if(this.currentScrollPosition<t){e.target.body.scrollHeight-t-e.target.documentElement.clientHeight<this.scrollThreshold&&!this.onInitLoading&&this.images$.next(this.pageId)}this.currentScrollPosition=t},e.ctorParameters=function(){return[{type:r.a},{type:IConfig,decorators:[{type:i.G,args:[a.a]}]},{type:i._17},{type:void 0,decorators:[{type:i.G,args:[o.d]}]}]},e}()},"aR8+":function(e,t,n){"use strict";function i(e,t){return new r.b(e,t)}var r=n("CPp0");t.b=i,n.d(t,"a",function(){return a});var a=function(){function e(){}return e}()},cDNt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("/oeL"),r=n("p5Ee"),a=n("+h1B"),o=n("fc+i");r.a.production&&n.i(i.a)(),n.i(o.a)().bootstrapModuleFactory(a.a)},k7ea:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[""]},"l6/X":function(e,t,n){"use strict";var i=n("/oeL");n.d(t,"a",function(){return r});var r=new i.E("app.config")},"p+YB":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return e.prototype.getRandomInteger=function(e,t){var n=e-.5+Math.random()*(t-e+1);return n=Math.round(n)},e.ctorParameters=function(){return[]},e}()},p5Ee:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i={production:!0}},q4dy:function(e,t,n){"use strict";function i(e){return o._12(0,[(e()(),o._13(0,null,null,2,"app-images",[],null,[["document","scroll"]],function(e,t,n){var i=!0;if("document:scroll"===t){i=!1!==o._14(e,2).onScroll(n)&&i}return i},s.a,s.b)),o._15(512,null,u.a,u.a,[l.b,c.a]),o._16(114688,null,0,d.a,[u.a,c.a,o._17,f.d],null,null),(e()(),o._18(null,["\n\n\n"]))],function(e,t){e(t,2,0)},null)}function r(e){return o._12(0,[(e()(),o._13(0,null,null,2,"app-root",[],null,null,null,i,y)),o._15(512,null,g.a,g.a,[p.a,m.a,c.a]),o._16(114688,null,0,h.a,[g.a],null,null)],function(e,t){e(t,2,0)},null)}var a=n("k7ea"),o=n("/oeL"),s=n("Kq16"),u=n("KFAf"),l=n("CPp0"),c=n("l6/X"),d=n("WfTK"),f=n("fc+i"),g=n("Fb2S"),p=n("9Es1"),m=n("p+YB"),h=n("wQAS");n.d(t,"a",function(){return I});var b=[a.a],y=o._11({encapsulation:0,styles:b,data:{}}),I=o._19("app-root",h.a,r,{},{},[])},qtrl:function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="qtrl"},wQAS:function(e,t,n){"use strict";var i=n("Fb2S");n.d(t,"a",function(){return r});var r=function(){function e(e){this.backend=e}return e.prototype.ngOnInit=function(){this.backend.start()},e.ctorParameters=function(){return[{type:i.a}]},e}()}},[0]);