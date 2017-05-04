import { OciWrapperDashboardPage } from './app.po';

describe('oci-wrapper-dashboard App', () => {
  let page: OciWrapperDashboardPage;

  beforeEach(() => {
    page = new OciWrapperDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
