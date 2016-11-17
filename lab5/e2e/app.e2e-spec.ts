import { Lab5Page } from './app.po';

describe('lab5 App', function() {
  let page: Lab5Page;

  beforeEach(() => {
    page = new Lab5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
