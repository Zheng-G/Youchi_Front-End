import { YouchiPage } from './app.po';

describe('youchi App', () => {
  let page: YouchiPage;

  beforeEach(() => {
    page = new YouchiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
