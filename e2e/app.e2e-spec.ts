import { HeroCyclePage } from './app.po';

describe('hero-cycle App', () => {
  let page: HeroCyclePage;

  beforeEach(() => {
    page = new HeroCyclePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
