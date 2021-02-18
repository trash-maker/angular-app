import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListPageComponent],
  imports: [CommonModule, RouterModule],
  exports: [ListPageComponent],
})
export class ListPageModule {}
