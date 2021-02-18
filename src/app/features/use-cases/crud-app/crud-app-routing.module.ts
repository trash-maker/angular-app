import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './containers/detail-page/detail-page.component';
import { DetailPageModule } from './containers/detail-page/detail-page.module';
import { ListPageComponent } from './containers/list-page/list-page.component';
import { ListPageModule } from './containers/list-page/list-page.module';
import { TaskResolver } from './resolvers/task.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListPageComponent,
  },
  {
    path: `:${TaskResolver.pathParam}`,
    resolve: {
      task: TaskResolver,
    },
    component: DetailPageComponent,
  },
];

@NgModule({
  imports: [ListPageModule, DetailPageModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudAppRoutingModule {}
