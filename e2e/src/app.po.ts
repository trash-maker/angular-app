import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      // tslint:disable-next-line: quotemark
      by.css("[data-test='form.title']")
    ).getText() as Promise<string>;
  }
}
