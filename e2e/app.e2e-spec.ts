import { InfiniteGalleryPage } from './app.po';

describe('infinite-gallery App', () => {
  let page: InfiniteGalleryPage;

  beforeEach(() => {
    page = new InfiniteGalleryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
