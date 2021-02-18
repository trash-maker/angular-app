import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { childActivatedRoute } from 'src/utils/router.utils';
import { MessagePageComponent } from './core/components/message-page/message-page.component';
import { MessagePageModule } from './core/components/message-page/message-page.module';
import { LandingPageComponent } from './features/containers/landing-page/landing-page.component';
import { LandingPageModule } from './features/containers/landing-page/landing-page.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  {
    path: 'use-case/crud-app',
    loadChildren: () =>
      import('./features/use-cases/crud-app/crud-app-routing.module').then(
        (m) => m.CrudAppRoutingModule
      ),
    data: { title: 'CRUD App' },
  },
  { path: '**', component: MessagePageComponent, data: { title: 'Ouch!' } },
];

@NgModule({
  imports: [
    LandingPageModule,
    MessagePageModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [Title],
  exports: [RouterModule],
})
export class AppRoutingModule {
  appTitle: string;

  constructor(router: Router, titleService: Title) {
    this.appTitle = titleService.getTitle();
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        childActivatedRoute(router),
        map((route) => {
          let title = route.snapshot.data.title;
          while (route.parent && !title) {
            route = route.parent;
            title = route.snapshot.data.title;
          }
          return title || this.appTitle;
        })
      )
      .subscribe((title: string) => {
        titleService.setTitle(title);
      });
  }
}
