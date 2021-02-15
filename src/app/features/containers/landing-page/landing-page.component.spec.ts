import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageModule } from './landing-page.module';

describe('LandingPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LandingPageModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      // tslint:disable-next-line: quotemark
      compiled.querySelector("[data-test='form.title']").textContent
    ).toContain(
      `Welcome to app ${fixture.componentInstance.title}-${fixture.componentInstance.version}`
    );
  });
});
